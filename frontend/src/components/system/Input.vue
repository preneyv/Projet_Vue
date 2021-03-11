<template>
	<div class="input-wrapper">
		<label v-if="label" :for="id" class="input-wrapper__input-label">
			{{ label }}<span v-if="required"> *</span>
		</label>

    <div class="input-wrapper__input-row">
      <div v-if="prefix" class="input-wrapper__input-row__input-prefix">{{ prefix }}</div>
      <input :class="`${error ? 'invalid' : ''}`"
				v-bind="propsForInput"
				:invalid="error"
				@input="onInput"
				@change="onChange"
				@click="onChange"
				@focus="onFocus"
    />
    </div>

    <small class="input-wrapper__error" v-if="error">{{ error }}</small>
  </div>
</template>

<script>
export default {
	name: 'BaseInput',
	props: {
		// Basic
		type: String,
		id: String,
		name: String,
		placeholder: String,
		value: String,
		required: Boolean,
		disabled: Boolean,
		readonly: Boolean,
		autocomplete: Boolean,
		autofocus: Boolean,
		// Custom
		label: String,
		prefix: String,
		error: String,
		// Events
		onInput: Function,
		onChange: Function,
		onClick: Function,
		onFocus: Function,
		// Specific text and password
		minlength: Number,
		maxlength: Number,
		pattern: RegExp,
		// Specific number
		min: Number,
		max: Number,
		step: Number
  },
	data() {
		return {
			propsForInput: {
				type: this.type,
				id: this.id,
				name: this.name,
				placeholder: this.placeholder,
				value: this.value,
				required: this.required,
				disabled: this.disabled,
				readonly: this.readonly,
				autocomplete: this.autocomplete,
				autofocus: this.autofocus,
				...(this.type === 'text' || this.type === 'password' ? {
					minlength: this.minlength,
					maxlength: this.maxlength,
					pattern: this.pattern
				} : this.type === 'number' ? {
					min: this.min,
					max: this.max,
					step: this.step
				} : {})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.input-wrapper {
	position: relative;
  font-size: 14px;

	&__input-label {
		display: block;
		margin-bottom: 5px;

		span {
			opacity: 0.55;
		}
	}

  &__input-row {
		display: flex;
		justify-content: flex-start;

		&__input-prefix {
			padding: calc(1rem - 1px) 1rem;
			background-color: #313131;
			border: 1px solid lighten($color: #252525, $amount: 15);
			border-right: none;
			text-align: center;
			width: auto;
			flex: 2;
		}

		input {
			background-color: #252525;
			border: 1px solid lighten($color: #252525, $amount: 15);
			font-size: 14px;
			color: white;
			padding: 1rem 1.5rem;
			position: relative;
			flex: 4;

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

  &__error {
		color: var(--color-error);
		font-size: 12px;
	}
}
</style>