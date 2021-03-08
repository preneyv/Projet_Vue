<template>
  <div class="multiselect-wrapper">
    <label class="multiselect-wrapper__multiselect-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <div class="multiselect-wrapper__multiselect">
        <div
            v-bind:class="`multiselect-wrapper__current ${selected.length !== 0 ? '' : 'no-value'}`"
            @click="focused = !focused"
        >
            {{ selected.length !== 0 ? selected.map(item => item.name).join(', ') : 'Sélectionner...' }}
        </div>

        <div class="multiselect-wrapper__dropdown" v-show="focused">
            <ul class="multiselect-wrapper__options">
                <li
                    class="multiselect-wrapper__option"
                    v-for="item, i in items"
                    v-bind:key="i"
                    @click="() => handleItemClick(item)">
                    <span class="multiselect-wrapper__option__status">
                        <font-awesome-icon icon="check" v-if="selected.includes(item)"/>
                    </span>
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>

    <select v-bind:id="id" v-bind:name="name" :required="required" multiple>
        <option v-for="item, i in items" v-bind:key="i" v-bind:value="item.value" :selected="selected.includes(item)">
            {{ item.name }}
        </option>
    </select>
  </div>
</template>

<script>
export default {
    name: 'MultiSelectComponent',
    props: {
        id:          String,
        label:       String,
        name:        String,
        required:    Boolean,
        items:       Array
    },
    data () {
        return {
            focused: false,
            selected: []
        }
    },
    methods: {
        handleItemClick(item) {
            const itemIndex = this.selected.indexOf(item)
            if (itemIndex === -1) {
                this.selected.push(item)
                this.selected.sort(this.compareItems)
            }
            else {
                delete this.selected.splice(itemIndex, 1)
            }
        },

        handleOutsideClick(event) {
        if (!this.$el.contains(event.target))
            this.focused = false
        },

        compareItems(a, b) {
            return this.items.indexOf(a) > this.items.indexOf(b)
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick, true)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick, true)
    },
}
</script>

<style lang="scss" scoped>
.multiselect-wrapper {
    position: relative;
    user-select: none;
    display: table;

	&__multiselect-label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;
	}

	&__multiselect {
		background-color: #252525;
		font-size: 14px;
		color: var(--primary-color);
		border: none;
		min-width: 300px;

		&:focus {
			outline: none;
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
        border-top: 1px solid rgba(0, 0, 0, 0.25);
        position: absolute;
        width: 100%;
        z-index: 1000;
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

    select {
        display: none;
    }
}
</style>
