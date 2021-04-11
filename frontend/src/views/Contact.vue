<template>
  <div class="container">
    <h1 class="h-1">Contactez-nous</h1>
    <form>
      <BaseInput
          v-for="input in contactInputs"
          :key="input.id"
          v-bind="input"
      />

      <textarea name="message" id="message" v-model="message" rows="10" placeholder="Ecrivez votre message"></textarea>
      <button type="submit" @click="submitContact" class="btn btn-primary">Envoyer</button>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/system/Input.vue"

export default {
  name: "Contact",
  data() {
    return {
      message: null,
      contactInputs: [
        {
          id: "name",
          name: "name",
          prefix: "Nom",
          placeholder: "Saisir un nom",
          required: true,
        },
        {
          id: "email",
          name: "email",
          type: "email",
          prefix: "Email",
          placeholder: "Saisir un email",
          required: true,
        },
      ],
    }
  },
  components: {
    BaseInput,
  },
  methods: {
    submitContact() {
      console.log("form submited")
    },
  },
}
</script>


<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-bottom: space(12);
}

form {
  @extend %mx-auto;
  max-width: space(150);
  margin-bottom: space(12);
  @include flex($direction: column, $justify: flex-start, $align: stretch);

  & > * + * {
    margin-top: space(4);
  }

  textarea {
    width: 100%;
    font: inherit;
    border: 1px solid lighten(#252525, 15);
    background: transparent;
    color: map-get($colors, "white");
    padding: space(3);
  }

}
</style>
