<template>
  <div class="project">
    <div class="project__container">
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
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <div class="project__global-infos">
            <h2 class="h-3">Informations globales du projet</h2>
            <p>Projet lancé en
              {{
                getDate(project.startedDate).toLocaleDateString(lang, {
                  year: "numeric",
                  month: "long",
                })
              }}<span v-if="project.stateProject"> - {{ project.stateProject }}</span>
            </p>
            <div>
              <span>A la recherche de :</span>
              <ul>
                <li v-for="job in project.jobs" :key="job.type">{{ job.requiredNb }} {{ getTypeCollab(job.type) }}</li>
              </ul>
            </div>
          </div>
          <h3 class="h-3">Description du projet</h3>
          <p>{{ project.description }}</p>
          <div class="project__subscribe">
            <h3 class="h-3">Collaborer sur le projet</h3>
            <div v-if="isConnected" class="add-to-project">
              <span>Pour apporter son aide au projet, veuillez sélectionner le type de collaboration souhaitée dans la liste ci-dessous :</span>
              <div class="select-collab"><BaseSelect v-bind="select" :onChange="handleChangeSelectCollab"/></div>
              <div class="btn-div"><button href="#" class="btn btn-secondary" @click="sendRequestCollab">Participer au Projet</button></div>
              <div class="notif-section" v-if="notifs !== null"><HandlingNotif  :notifs="notifs" :removeNotif="removeNotif"/></div>
            </div>
            <div v-else>
              <span>Vous souhaitez participer à ce projet ? <router-link to="/login">Connectez-vous.</router-link></span>
            </div>
          </div>


        </div>
        <div v-if="project.links" class="project__sidebar">
          <h4 class="h-3">Liens externes</h4>
          <ul>
            <li v-for="link in project.links" :key="link.value">
              <a :href="link.value" target="_blank" rel="noopener noreferrer">
                {{ link.title }}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ProjectsService from "@/services/projects.js";
import { profilTypes } from "@/constants/contributor.js";

import BaseSelect from '@/components/system/Select.vue'
import HandlingNotif from "@/components/HandlingNotif.vue"


export default {
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
      notifs:null
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

  },
  computed: {
    isConnected() {
      return this.$store.state.auth.authenticated
    }
  },
  methods: {
    /**
     * Récupère le name associé à la clef dans profilTypes
     */
    getTypeCollab(val) {
      return profilTypes[val]?.name
    },
    /**
     * Permet de formater la date
     */
    getDate(el) {
      return new Date(el);
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

        this.$router.push({path: '/dashboard'})

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

  &__container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  &__title {
    font-weight: 900;
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
    grid-template-columns: 1fr 10rem;
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
    .add-to-project {
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
    margin-top: space(12);
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
