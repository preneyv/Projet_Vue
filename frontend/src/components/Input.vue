<template>
  <div class="input">
    <label v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <input
        v-bind:id="id"
        v-bind:type="type"
        v-bind:placeholder="placeholder"
        v-bind:name="name"
    />
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    id:          String,
    type:        String,
    placeholder: String,
    label:       Boolean,
    name:        String,
    required:    Boolean
  }
}
</script>

<style lang="scss" scoped>

label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
}

input {
    background-color: #484848;
    font-size: 14px;
    color: white;
    border: none;
    width: 300px;
    height: 50px;


    &:focus {
        outline: none;
        border-bottom: solid 1px white;
    }
}
</style>
