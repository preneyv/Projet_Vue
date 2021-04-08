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
                @click="() => redirectTo(item.url)"
            >
                <a v-if="item.url" :href="item.url">{{ item.label }}</a>
                <span v-if="item.action" @click="item.action">{{ item.label }}</span>
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
		font-weight: 700;
		font-family: var(--typo-title);
		text-transform: uppercase;
		margin-top: space(4);
        
		@include responsive("tablet") {
			margin-top: 0;
			font-weight: 600;
			font-size: space(4.5);
			text-transform: initial;
		}
    }

    &__items {
        position: absolute;
        padding: 0.5rem;
        background-color: var(--color-dark-black);
        width: 100%;
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