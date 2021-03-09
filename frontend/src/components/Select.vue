<template>
  <div class="select-wrapper">
    <label class="select-wrapper__select-label" v-if="label" v-bind:for="id">{{ label }}<span v-if="required"> *</span></label>
    <div v-bind:class="`select-wrapper__select ${invalid ? 'invalid' : ''}`" @click="focused = !focused">
        <div v-bind:class="`select-wrapper__current ${error ? '' : 'no-value'}`">
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
    <small class="input-wrapper__error" v-if="error">{{ error }}</small>

    <select v-bind:id="id" v-bind:name="name" :required="required">
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
        items:       Array,
        error:       String,
    },
    data () {
        return {
            focused: false,
            selected: null
        }
    },
    methods: {
        handleOutsideClick(event) {
        if (!this.$el.contains(event.target))
            this.focused = false
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
