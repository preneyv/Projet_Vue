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
				<span v-if="selected.length === 0">Sélectionner...</span>

				<span
					v-for="item in selected"
					:key="item.value"
					class="select-wrapper__current__item"
					:style="{backgroundColor: `${item.color}55`, borderColor: `${item.color}AA`}"
				>
					{{ item.name }} <font-awesome-icon icon="times" @click="e => handleItemSpanClick(e, item)"/>
				</span>
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
					<input class="select-wrapper__dropdown__search" v-model="research" @input="updateDisplayedItems"/>
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
		initialValue: Object || Array,
		// Events
		onChange: Function,
		onClick: Function,
		onFocus: Function,
		onFocusout: Function
	},
	data () {
		return {
			focused: this.autofocus,
			selected: this.initialValue ? this.initialValue : this.multiple ? [] : null,
			dataItems: this.items,
			research: null,
			select: null
		}
	},
	computed: {
		displayedItems() {
			return this.size === null ? this.dataItems : this.dataItems.slice(0 , this.size)
		}
	},
	watch: {
    '$props': {
      handler: function (props) {
        this.dataItems = props.items
				this.research = null
      },
      deep: true
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

				this.updateRealSelectValue()
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

		handleItemSpanClick(e, item) {
			const itemIndex = this.selected.indexOf(item)
			if (itemIndex !== -1)
				delete this.selected.splice(itemIndex, 1)
			
			this.updateRealSelectValue()
			e.stopPropagation()
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
			this.dataItems = this.size === null ? matchingItems : matchingItems.slice(0, this.size)
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

		updateRealSelectValue() {
			for (let option of this.select.options) {
				if (this.selected.filter(item => item.value === option.value).length !== 0) {
					option.selected = true
				}
				else {
					option.selected = false
				}
			}
		}
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
		display: flex;
		flex-wrap: wrap;
		gap: 5px;

		&__item {
			font-size: 12px;
			background-color: lighten($color: #252525, $amount: 10);
			border: 1px solid lighten($color: #252525, $amount: 20);
			border-radius: 2px;
			padding: 0.5px 6px;
		}

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
		overflow-y: auto;
		max-height: 500%;

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
