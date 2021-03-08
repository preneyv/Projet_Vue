<template>
  <div class="input-wrapper">
    <label class="input-wrapper__input-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
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
    name:        String,
    required:    Boolean
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
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
		min-width: 300px;
		padding: 1rem 1.5rem;
    border-bottom: solid 1px transparent;

		&:focus {
			outline: none;
			border-bottom: solid 1px var(--color-primary);
		}
	}
}
</style>
