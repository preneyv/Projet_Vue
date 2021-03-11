<template>
	<div class="select-wrapper">
		<!-- Label -->
		<label
			v-if="label"
			:for="id"
			class="select-wrapper__select-label"
		>
			{{ label }}<span v-if="required"> *</span>
		</label>
		<!-- /Label -->

		<!-- Select wrapper -->
    <div :class="`select-wrapper__select ${error ? 'invalid' : ''}`">
			<!-- Select -->
			<div
				v-if="multiple"
				:class="`select-wrapper__current ${selected.length !== 0 ? '' : 'no-value'}`"
				@click="handleClick"
			>
				{{ selected.length !== 0 ? selected.map(item => item.name).join(', ') : 'Sélectionner...' }}
			</div>

			<div
				v-else
				:class="`select-wrapper__current ${selected ? '' : 'no-value'}`"
				@click="handleClick"
			>
				{{ selected ? selected.name : 'Sélectionner...' }}
			</div>
			<!-- /Select -->

			<!-- Select dropdown -->
			<div v-show="focused" class="select-wrapper__dropdown">
				<!-- Select searcher -->
				<div v-if="allowSearch" class="select-wrapper__dropdown__search-wrapper">
					<input class="select-wrapper__dropdown__search" @input="updateDisplayedItems"/>
				</div>
				<!-- /Select searcher -->

				<!-- Select option list -->
				<ul class="select-wrapper__options">
					<!-- Select option -->
					<li
						v-for="item, i in displayedItems"
						:key="i"
						class="select-wrapper__option"
						@click="() => handleItemClick(item)"
					>
						<span v-if="multiple" class="select-wrapper__option__status">
								<font-awesome-icon icon="check" v-if="selected.includes(item)"/>
						</span>
						{{ item.name }}
					</li>
					<!-- /Select option -->
				</ul>
				<!-- /Select option list -->
			</div>
			<!-- /Select dropdown -->
		</div>
		<!-- /Select wrapper -->

		<small class="input-wrapper__error" v-if="error">{{ error }}</small>

		<!-- Real select (not shown)-->
		<select
			v-show="false"
			:id="id"
			:name="name"
			:required="required"
			:multiple="multiple"
			@change="onChange"
			@click="onClick"
			@focus="onFocus"
			@focusout="onFocusout"
		>
		<option value="" :selected="multiple ? selected.length === 0 : selected !== null"></option>
			<option v-for="item, i in items" :key="i" :value="item.value" :selected="multiple ? selected.includes(item) : selected === item">
				{{ item.name }}
			</option>
    </select>
		<!-- /Real select -->
	</div>
</template>

<script>
import { removeAccents } from '@/utils/string.js'

export default {
	name: 'BaseSelect',
	props: {
		// Basic
		id: String,
		name: String,
		required: Boolean,
		autofocus: Boolean,
		disabled: Boolean,
		multiple: Boolean,
		size: Number,
		// Custom
		label: String,
		items: Array,
		error: String,
		allowSearch: Boolean,
		// Events
		onChange: Function,
		onClick: Function,
		onFocus: Function,
		onFocusout: Function
	},
	data () {
		return {
			focused: this.autofocus,
			selected: this.multiple ? [] : null,
			displayedItems: this.size === null ? this.items : this.items.slice(0 , this.size),
			select: null
		}
	},
	methods: {
		handleItemClick(item) {
			if (this.multiple) {
				const itemIndex = this.selected.indexOf(item)
				if (itemIndex === -1) {
					this.selected.push(item)
					this.selected.sort(this.compareItems)
				}
				else {
					delete this.selected.splice(itemIndex, 1)
				}

				// Add value to real select
				for (let option of this.select.options) {
					if (this.selected.filter(item => item.value === option.value).length !== 0) {
						option.selected = true
					}
					else {
						option.selected = false
					}
				}

				this.select.dispatchEvent(new Event("change"))
			}
			else {
				this.selected = item
				this.focused = false
				this.select.value = this.selected.value
				this.select.dispatchEvent(new Event("change"))
				this.select.dispatchEvent(new Event("focusout"))
			}
		},

		handleOutsideClick(event) {
			if (!this.$el.contains(event.target)) {
				this.focused = false
				this.select.dispatchEvent(new Event("focusout"))
			}
		},

		compareItems(a, b) {
			return this.items.indexOf(a) > this.items.indexOf(b)
		},

		updateDisplayedItems(event) {
			const research = removeAccents(event.target.value.toLowerCase())
			const matchingItems = this.searchItems(research)
			this.displayedItems = this.size === null ? matchingItems : matchingItems.slice(0, this.size)
		},

		searchItems(research) {
			if (research.trim().length === 0) return this.items

			return this.items.filter(item => {
				const name = removeAccents(item.name.toLowerCase())
				return name.includes(research)
			})
		},

		handleClick() {
			if (this.disabled) return

			if (this.focused) {
				this.focused = false
				this.select.dispatchEvent(new Event("focusout"))
			}
			else {
				this.focused = true
				this.select.dispatchEvent(new Event("focus"))
			}

			this.select.dispatchEvent(new Event("click"))
		},
	},
	mounted() {
		document.addEventListener('click', this.handleOutsideClick, true)

		this.select = this.$el.getElementsByTagName('select')[0]
		this.select.getValues = function() {
			return Array.from(this.querySelectorAll('option:checked'), option => option.value)
		}
	},
	beforeUnmount() {
		document.removeEventListener('click', this.handleOutsideClick, true)
	},
}
</script>

<style lang="scss" scoped>
.select-wrapper {
	position: relative;
	user-select: none;
	display: table;
	width: 100%;

	&__select-label {
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

	&__select {
		background-color: #252525;
		font-size: 14px;
		color: var(--primary-color);
		border: 1px solid lighten($color: #252525, $amount: 15);

		&.invalid {
			border: 1px solid var(--color-error);
		}
	}

	&__current {
		padding: 1rem 1.5rem;
		cursor: default;

		&.no-value {
				color: #9A9A9A;
		}
	}

	&__dropdown {
		background-color: #252525;
		border: 1px solid lighten($color: #252525, $amount: 15);
		border-top: none;
		box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);
		position: absolute;
		left: 0;
		transform: translateY(1px);
		width: 100%;
		z-index: 1000;

		&__search-wrapper {
			padding: 0.75rem 1.5em 0.5em;
		}

		&__search {
			padding: 0.5rem 0.5em;
			border-radius: 3px;
			color: var(--primary-color);
			background-color: darken($color: #252525, $amount: 2);
			border: 1px solid lighten($color: #252525, $amount: 15);
			width: 100%;

			&:focus {
				outline: none;
				border: 1px solid lighten($color: #252525, $amount: 40);
			}
		}
	}

	&__option {
		padding: 0.5rem 1.5em;
		cursor: default;

		&:hover {
			background-color: lighten($color: #252525, $amount: 2)
		}

		&__status {
			display: inline-block;
			width: 1em;
			height: 1em;
			margin-right: 1em;
		}
	}
}
</style>