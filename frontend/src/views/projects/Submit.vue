<template>
  <div class="submit-project">
    <PageTitle text="Soumettre un projet"/>

    <InputComponent
      id="project-name"
      name="name"
      type="text"
      placeholder="Mon super projet"
      label="Nom"
      required
    />

    <TextAreaComponent
      id="project-description"
      name="description"
      placeholder="Ce projet a pour but..."
      label="Description"
    />

    <SelectComponent
      id="project-license"
      name="license" 
      label="Licence"
      v-bind:items="licenses"
      required
    />

    <MultiSelectComponent
      id="project-categories"
      name="categories"
      label="Catégorie(s)"
      v-bind:items="categories"
      required
    />

    <InputComponent
      id="project-name"
      name="name"
      type="text"
      placeholder="Email, téléphone, etc..."
      label="Contact"
      required
    />

    <InputComponent
      v-for="type in linkTypes"
      v-bind:key="`link-${type.value}`"
      v-bind:id="`project-${type.value}-link`"
      v-bind:name="`link-${type.value}`"
      type="url"
      v-bind:placeholder="type.example"
      v-bind:prefix="type.name"
    />

  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import InputComponent from '@/components/Input.vue'
import SelectComponent from '@/components/Select.vue'
import MultiSelectComponent from '@/components/MultiSelect.vue'
import TextAreaComponent from '@/components/TextArea.vue'

export default {
  name: 'SubmitProject',
  components: {
    PageTitle,
    InputComponent,
    SelectComponent,
    MultiSelectComponent,
    TextAreaComponent
  },
  data () {
    return {
      licenses: [
        { value: "CC-ZERO",     name: "CC Zero" },
        { value: "CC-BY",       name: "CC BY" },
        { value: "CC-BY-SA",    name: "CC BY-SA" },
        { value: "CC-BY-ND",    name: "CC BY-ND" },
        { value: "CC-BY-NC",    name: "CC BY-NC" },
        { value: "CC-BY-NC-SA", name: "CC BY-NC-SA" },
        { value: "CC-BY-NC-ND", name: "CC BY-NC-ND" },
      ],
      categories: [
        { value: "development", name: "Développement" },
        { value: "education",   name: "Éducation" },
        { value: "games",       name: "Jeux" },
        { value: "graphics",    name: "Graphiques" },
        { value: "internet",    name: "Internet" },
        { value: "multimedia",  name: "Multimédia" },
        { value: "office",      name: "Bureautique" },
        { value: "system",      name: "Système" },
        { value: "utilities",   name: "Utilitaires" },
      ],
      linkTypes: [
        { value: "official", name: "Site officiel", example: "https://example.com" },
        { value: "github",   name: "GitHub",        example: "https://github.com/"},
        { value: "wiki",     name: "Wiki",          example: "https://example.com"},
        { value: "npm",      name: "npm",           example: "https://www.npmjs.com/package/" },
        { value: "other",    name: "Autre",         example: "https://example.com" },
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
