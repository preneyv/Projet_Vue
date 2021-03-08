<template>
  <div class="input-wrapper">
    <label class="input-wrapper__input-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <div class="input-wrapper__input-prefix" v-if="prefix">{{ prefix }}</div>
    <input class="input-wrapper__input"
        v-bind:id="id"
        v-bind:type="type"
        v-bind:placeholder="placeholder"
        v-bind:name="name"
        :required="required"
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
    label:       String,
    prefix:      String,
    name:        String,
    required:    Boolean
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  font-size: 14px;
  position: relative;

	&__input-label {
		display: block;
		margin-bottom: 5px;

		span {
				opacity: 0.55;
			}
	}

  &__input-prefix {
		padding: calc(1rem - 1px) 1rem;
    background-color: #313131;
    border: 1px solid lighten($color: #252525, $amount: 15);
    border-right: none;
    display: inline-block;
    text-align: center;
	}

  &__input {
		background-color: #252525;
		font-size: 14px;
		color: white;
		border: 1px solid lighten($color: #252525, $amount: 15);
		padding: 1rem 1.5rem;
		position: relative;
		z-index:2;



		&:focus {
			outline: none;
			border: 1px solid lighten($color: #252525, $amount: 60);
			
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
