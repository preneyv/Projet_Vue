<template>
	<div :class="`dropdown ${forNavbar ? 'dropdown-navbar' : ''}`">
		<button class="dropdown__label" @click="toggle">
			{{ label }}
            <font-awesome-icon icon="caret-down" v-if="!openned"/>
            <font-awesome-icon icon="caret-up" v-if="openned"/>
		</button>

		<ul v-if="openned" class="dropdown__items">
      <li
                v-for="item in items"
                :key="item"
                class="dropdown__item"
                @click="() => item.url ? redirectTo(item.url) : item.action()"
      >
                <router-link v-if="item.url" :to="item.url">{{ item.label }}</router-link>
                <span v-if="item.action">{{ item.label }}</span>
      </li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'BaseDropdown',
	props: {
		label: String,
		items: Array,
        forNavbar: Boolean
	},
    data() {
        return {
            openned: false
        }
    },
    methods: {
        toggle() {
            this.openned = !this.openned
        },
        redirectTo(url) {
            window.location.href = url
        }
    }
}
</script>

<style lang="scss" scoped>
.dropdown {
    position: relative;
    font-size: 1rem;

    &.dropdown-navbar {
        font-size: space(8);
		margin-top: space(4);

        button {
            font-weight: 700 !important;
		    font-family: var(--typo-title) !important;
            text-transform: uppercase;
        }
        
		@include responsive("tablet") {
			margin-top: 0;
			font-size: space(4.5);

            button {
                font-weight: 600;
                text-transform: initial;
            }
		}
    }

    &__items {
        position: absolute;
        padding: 0.5rem;
        background-color: var(--color-dark-black);
        border-radius: 5px;
        box-shadow: 0 0 5px black;
        top: 30px;
    }

    &__item {
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        transition: all 150ms ease-in-out;
        cursor: pointer;
    }

    &__item:hover {
        background-color: var(--color-primary);
        color: var(--color-black);
    }
}
</style>