<template>
  <div class="text-area-wrapper">
    <label class="text-area-wrapper__area-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <textarea class="text-area-wrapper__area"
        v-bind:id="id"
        v-bind:placeholder="placeholder"
        v-bind:name="name"
        v-bind:required="required"
    />
  </div>
</template>

<script>
export default {
  name: 'TextAreaComponent',
  props: {
    id:          String,
    placeholder: String,
    label:       String,
    name:        String,
    required:    Boolean
  }
}
</script>

<style lang="scss" scoped>
.text-area-wrapper {
	&__area-label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;
	}

	&__area {
        resize: vertical;
		background-color: #252525;
		font-size: 14px;
		color: white;
		border: 1px solid lighten($color: #252525, $amount: 15);
		padding: 1rem 1.5rem;
        margin: 0;

		&:focus {
			outline: none;
			border: 1px solid lighten($color: #252525, $amount: 60);
		}
	}
}
</style>
