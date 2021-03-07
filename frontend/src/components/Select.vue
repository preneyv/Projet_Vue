<template>
  <div class="select-wrapper">
    <label class="select-wrapper__select-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <div class="select-wrapper__select" @click="focused = !focused">
        <div v-bind:class="`select-wrapper__current ${selected ? '' : 'no-value'}`">
            {{ selected ? selected.name : 'Sélectionner...' }}
        </div>

        <div class="select-wrapper__dropdown" v-show="focused">
            <ul class="select-wrapper__options">
                <li
                    class="select-wrapper__option"
                    v-for="item, i in items"
                    v-bind:key="i"
                    @click="selected = item">
                    {{ item.name }}
                </li>
            </ul>
        </div>
    </div>

    <select v-bind:id="id" v-bind:name="name" v-bind:required="required">
        <option value="" disabled hidden :selected="selected === null ? true : false">Choisir</option>
        <option v-for="item, i in items" v-bind:key="i" v-bind:value="item.value" :selected="selected?.value === item.value">
            {{ item.name }}
        </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectComponent',
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
          selected: null
      }
  }
}
</script>

<style lang="scss" scoped>
.select-wrapper {
	&__select-label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;
	}

	&__select {
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

    &__option {
        padding: 0.5rem 1.5em;
        cursor: default;

        &:hover {
            background-color: lighten($color: #252525, $amount: 2)
        }
    }

    select {
        display: none;
    }
}
</style>
