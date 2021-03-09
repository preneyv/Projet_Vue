<template>
  <div class="text-area-wrapper">
    <label class="text-area-wrapper__area-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <textarea v-bind:class="`text-area-wrapper__area ${error ? 'invalid' : ''}`"
        v-bind:id="id"
        v-bind:placeholder="placeholder"
        v-bind:name="name"
        v-bind:required="required"
    />
    <small class="input-wrapper__error" v-if="error">{{ error }}</small>
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
    required:    Boolean,
    error:       String,
  }
}
</script>

<style lang="scss" scoped>
.text-area-wrapper {
  width: 100%;

	&__area-label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;

        span {
            opacity: 0.55;
        }
	}

  &__error {
		color: var(--color-error);
    font-size: 12px;
	}

	&__area {
        resize: vertical;
		background-color: #252525;
		font-size: 14px;
		color: white;
		border: 1px solid lighten($color: #252525, $amount: 15);
		padding: 1rem 1.5rem;
        margin: 0;
        width: 100%;

    &.invalid {
      border: 1px solid var(--color-error);
    }

		&:focus {
      outline: none;
			border: 1px solid lighten($color: #252525, $amount: 60);
		}

    &:invalid {
      box-shadow: none;
    }
	}
}
</style>
