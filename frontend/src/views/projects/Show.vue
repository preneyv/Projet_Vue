<template>
  <div class="project">
    <div v-if="isLoading" class="loading"><div>Chargement ...</div></div>
    <div v-else class="project__container">
      <a @click="$router.go(-1)" class="go-back">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7"/>
        </svg>
        <span>Retourner à la liste des projets</span>
      </a>
      <div v-if="project.error">{{ project.error }}</div>
      <section v-else class="project__inner">
        <div class="project__main">

          <h1 class="project__title h-1">{{ project.title }}</h1>

          <div class="project__tags">
            <span v-for="tag in project.tags" :key="tag">
              {{ categories.filter(category => category.value === tag)[0]?.name ?? tag }}
            </span>
          </div>

          <div class="project__main-infos">
            <ul>
              <li>
                Depuis
                {{
                  getDate(project.startedDate).toLocaleDateString(lang, {
                    year: "numeric",
                    month: "long",
                  })
                }}
              </li>
              <li>
                Sous licence {{ licenses.filter(license => license.value === project.licence)[0]?.name ?? "inconnue" }}
              </li>
              <li>
                Statut : <span class="project__status" :style="{ backgroundColor: project.active ? 'var(--color-success)' : 'var(--color-error)' }">{{ project.active ? "En cours" : "Terminé" }}</span>
              </li>
            </ul>
          </div>

          <div class="project__global-infos">
            <p>{{ project.sumup ?? "" }}</p>
            <p>{{ project.description ?? "" }}</p>
          </div>

          <div class="project__jobs">
            <h3 class="h-3">Profils recherchés</h3>
            <ul v-if="project.jobs?.length !== 0">
              <li v-for="job in project.jobs" :key="job.type">
                <div v-if="getTypeCollab(job.type) !== undefined">
                  {{ (job.requiredNb - job.nameCollabPeople?.length) || job.requiredNb }} {{ getTypeCollab(job.type) }}
                  <ul class="project__jobs__skills">
                    <li
                      v-for="skill in job.skills"
                      :key="skill"
                      class="project__jobs__skill"
                      :style="{backgroundColor: `${getSkillData(job.type, skill)?.color}55`, borderColor: `${getSkillData(job.type, skill)?.color}AA`}">
                      {{ getSkillData(job.type, skill)?.name ?? "Compétences non précisées" }}
                    </li>
                    <li class="project__jobs__skill" v-if="!job.skills?.length">Compétences non précisées</li>
                  </ul>
                </div>
              </li>
            </ul>
            <div v-else>Aucun</div>
          </div>

          <div class="project__subscribe">
            <h3 class="h-3">Collaborer sur le projet</h3>
            <div v-if="isConnected" class="add-to-project">
              <div v-if="project.active === false" class="teamIsFull">
                <span>Le projet est terminé.</span>
              </div>
              <div v-else-if="!isFull()" class="teamIsNotFull">
                <span>Pour apporter son aide au projet, veuillez sélectionner le type de collaboration souhaitée dans la liste ci-dessous :</span>
                <div class="select-collab"><BaseSelect v-bind="select" :onChange="handleChangeSelectCollab"/></div>
                <div class="btn-div"><button href="#" class="btn btn-secondary" @click="sendRequestCollab">Participer au Projet</button></div>
                <div class="notif-section" v-if="notifs !== null"><HandlingNotif  :notifs="notifs" :removeNotif="removeNotif"/></div>
              </div>
              <div v-else class="teamIsFull">
                <span>Toute l'équipe est au complet</span>
              </div>
            </div>
            <div v-else>
              <span>Vous souhaitez participer à ce projet ? <router-link to="/login?redirectTo=back">Connectez-vous.</router-link></span>
            </div>
          </div>


        </div>
        <div class="project__sidebar">
          <div class="project__contact" v-if="project.contact">
            <h4 class="h-3">Contact</h4>
            <p>{{ project.contact }}</p>
          </div>
          <div v-if="project.links?.length">
            <h4 class="h-3">Liens externes</h4>
            <ul>
              <li v-for="link in project.links" :key="link.value">
                <font-awesome-icon
                  :icon="officialLinkTypes.filter(type => type.value === link.title)[0]?.icon"
                  :style="{ width: '2rem' }"
                />
                <a :href="link.value" target="_blank" rel="noopener noreferrer" class="project__link">
                  {{ link.value }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProjectsService from "@/services/projects.js";
import { profilTypes } from "@/constants/contributor.js";
import { categories, licenses, officialLinkTypes } from "@/constants/project.js";

import BaseSelect from '@/components/system/Select.vue'
import HandlingNotif from "@/components/HandlingNotif.vue"



export default {
  name: "ShowProject",
  components: {
    BaseSelect,
    HandlingNotif
  },
  data() {
    return {
      project: [],
      lang: null,
      selectedCollab: null,
      select: {
        id: 'link',
        name: 'selectTypeCollab',
        items: [],
        required: true,
      },
      notifs:null,
      isLoading: true,
      categories,
      licenses,
      officialLinkTypes
    };
  },
  async mounted() {
    const { data } = await ProjectsService.getProjectById(
        this.$route.params.id
    );
    data.startedDate = new Date(data.startedDate);

    this.project = data;
    const { languages, language } = navigator;
    this.lang = languages.filter(
        (lang) => lang.includes(language) && lang.includes("-")
    )[0];

    this.select.items = data.jobs.map(el => {
      return {
        value: el.type,
        name: this.getTypeCollab(el.type)
      }
    })
    this.isLoading = false
  },
  computed: {
    isConnected() {
      return this.$store.state.auth.authenticated
    },

  },
  methods: {
    /**
     * Récupère le name associé à la clef dans profilTypes
     */
    getTypeCollab(val) {
      return profilTypes[val]?.name
    },
    getSkillData(profileType, skillType) {
      return profilTypes[profileType]?.skills.filter(skill => skill.value === skillType)[0]
    },
    /**
     * Récupère le name associé à la clef dans le tableau  categories
     */
    getNameTag(val) {
      return categories.find(({value}) => val === value).name
    },
    /**
     * Permet de formater la date
     */
    getDate(el) {
      return new Date(el);
    },
    isFull() {
      return  this.project.jobs?.every((el) => {
        return el.requiredNb === el.nameCollabPeople?.length
      }) ?? false
    },
    /**
     * Permet de récupèrer le contenu du select
     * @Param (e) évènement déclenché
     */
    handleChangeSelectCollab(e) {
        this.selectedCollab = e.target.value
    },
    /**
     * Envoie une demande de collaboration à l'administrateur du projet
     */
    async sendRequestCollab() {

      const {_id, name} = this.$store.state.auth.user

      if(!this.selectedCollab) {
        this.notifs = {type: 'error', message:`Veuillez selectionner un type de collaboration.`}
        return
      }

      if(this.project.author === _id) {
        this.notifs = {type: 'error', message:`Vous êtes l'administrateur du projet, vous ne pouvez pas vous ajouter en tant que collaborateur.`}
        return
      }

      let tempCollabObject = this.project.jobs.find(el => el.type === this.selectedCollab)
      let tempPersonCollab = tempCollabObject.nameCollabPeople.findIndex(el => el._collab === _id)

      if(tempPersonCollab !== -1) {
        this.notifs = {type: 'error', message:`Vous êtes déjà sur le projet en tant que ${this.getTypeCollab(this.selectedCollab)}.`}
        return
      }

      let collab = {
        _id: _id,
        name: name,
        type: this.selectedCollab
      }
      let res = await ProjectsService.addToCollabRequest(this.project._id, collab)
      const { modified } = res?.data ?? 0

      if(modified === 1) {

        this.notifs =  {type: 'success', message:`Votre demande de participation a bien été transmise à l'administrateur du projet.`}

      }else{
        this.notifs =  {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
      }
    },
    /**
     * Retire la notification du tableau de notification
     */
    removeNotif() {
      this.notifs = null
    }
  },
};
</script>

<style lang="scss" scoped>
.project {
  margin-top: 2rem;

  .loading{
    width: 100%;
    height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 2rem;

    div {
      background-color: #252525;
      border: 1px solid #4b4b4b;
      padding: 0.5rem;
    }
  }

  &__container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  &__title {
    font-weight: 900;
  }

  &__main-infos {
    margin-top: 2rem;
    margin-left: 1rem;

    ul {
      list-style-type: disc;
    }
  }

  &__status {
    color: black;
    padding: 2px 8px;
    border-radius: 15px;
  }

  &__jobs {
    &__skills {
      display: flex;
      flex-wrap: wrap;
    }

    &__skill {
      font-size: 0.9rem;
			background-color: lighten($color: #252525, $amount: 10);
			border: 1px solid lighten($color: #252525, $amount: 20);
      border-radius: 20px;
      padding: 5px 12px;
      margin-right: 0.5rem;
    }
  }

  &__global-infos {
    margin: space(8) 0;

    & > p + p {
      margin-top: space(4);
    }
  }

  &__inner {
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
    display: grid;
    gap: space(3);
    grid-template-columns: 1fr 15rem;
    grid-auto-rows: auto;
    grid-auto-flow: row;
  }

  &__main {
    width: 100%;
  }

  &__sidebar {
    h3 {
      font-family: var(--typo-title);
      font-weight: 700;
    }

    font-size: space(5);
  }

  &__contact {
    font-size: 1rem;
  }

  &__link {
    margin-left: 0.5rem;
    font-size: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }

  &__tags {
    margin-top: space(2);
    @include flex($justify: flex-start, $wrap: wrap);

    span {
      margin-left: space(1);
      margin-right: space(1);
      padding: space(1) space(4);
      border-radius: space(5);
      background-color: var(--color-white);
      color: var(--color-black);
    }
  }

  &__subscribe {
    margin-top: 4rem;
    .teamIsNotFull {
      @include flex(column, center, unset);

      .select-collab {
        width: 40%;
        margin-top: 2rem;
      }

      .notif-section {
        width: max-content;
      }
    }

  }

  .btn {
    margin-top: space(8);
    margin-bottom: space(4);
    font-size: space(6);
    font-weight: 700;
    display: inline-block;
  }
}

.go-back {
	cursor: pointer;
	@include flex($type: inline-flex);

	span {
		margin-left: space(2);
	}
}
</style>
