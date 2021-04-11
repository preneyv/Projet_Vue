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
              <span>A la recherche de</span>
              <ul>
                <li v-for="job in project.jobs" :key="job.type">{{ job.requiredNb }} {{ job.type }}</li>
              </ul>
            </div>
          </div>
          <h3 class="h-3">Description du projet</h3>
          <p>{{ project.description }}</p>
          <a href="#" class="btn btn-secondary">Participer au Projet</a>
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

export default {
  data() {
    return {
      project: [],
      lang: null,
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
  },
  methods: {
    getDate(el) {
      return new Date(el);
    },
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
