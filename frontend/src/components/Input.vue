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
  name: 'HelloWorld',
  props: {
    id:          String,
    type:        String,
    placeholder: String,
    label:       String,
    name:        String,
    required:    Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '../config.scss';

label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
}

input {
    background-color: #121212;
    font-family: $font;
    font-size: 14px;
    color: white;
    padding: 10px 20px;
    border: 1px solid #323232;
    border-radius: 5px;

    &:focus {
        outline: none;
        border-color: #1c62b9;
    }
}
</style>
