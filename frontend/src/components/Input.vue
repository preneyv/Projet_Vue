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

	&__input-label {
		display: block;
		margin-bottom: 5px;
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
		color: white;
    border: 1px solid lighten($color: #252525, $amount: 15);
		padding: 1rem 1.5rem;

		&:focus {
			outline: none;
			border: 1px solid lighten($color: #252525, $amount: 60);
		}
	}
}
</style>
