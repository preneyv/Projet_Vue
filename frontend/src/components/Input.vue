<template>
  <div class="input-wrapper">
    <label class="input-wrapper__input-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <input class="input-wrapper__input"
        v-bind:id="id"
        v-bind:type="type"
        v-bind:placeholder="placeholder"
        v-bind:name="name"
        v-bind:required="required"
    />
    <div class="barBottomInput"></div>
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
.input-wrapper {
  position: relative;

	&__input-label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;
	}


  &__input {
      background-color: #252525;
      font-size: 14px;
      color: white;
      border: none;
      width: 300px;
      height: 50px;
      position: relative;
      z-index:2;



      &:focus {
          outline: none;
          & + .barBottomInput{
            width:300px;
            transition: all .5s ease-in-out;
          }
      }

  }

  .barBottomInput{
    width: 0;
    height: 50px;
    left: 0;
    top: 3px;
    border-bottom: solid 3px #41b883;
    position: absolute;
    z-index: 1;
    transition: width 0.5s ease-in-out;
  }
   
}

</style>
