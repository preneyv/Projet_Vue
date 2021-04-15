<template>
	<nav class="navbar">
		<div class="navbar__container">
			<div class="navbar__logo">
				<router-link to="/">
					<img src="../assets/logo.png" alt="Logo Vue" />
				</router-link>
			</div>
			<div @click="toggleMenu" class="navbar__burger" ref="button">
				<font-awesome-icon icon="times" class="navbar__burger__icon" v-if="menuOpened"/>
				<font-awesome-icon icon="bars" class="navbar__burger__icon" v-if="!menuOpened"/>
			</div>
			<div class="navbar__items" ref="items">
				<ul class="navbar__items-inner">
					<li
						v-for="item in items.filter(item => !item.hide)"
						:key="item.url"
						class="navbar__item"
						@click="() => {
							if (item.type !== 'dropdown')
								toggleMenu()
						}"
					>
						<router-link
							v-if="item.type === 'link' || item.type === 'callToAction'"
							:to="item.url"
							:class="{ cta: item.type === 'callToAction' }"
						>
							{{ item.name }}
						</router-link>

						<BaseDropdown
							v-if="item.type === 'dropdown'"
							:label="item.name"
							:items="item.items"
							:forNavbar="true"
						/>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import AuthService from '@/services/auth.js'
import BaseDropdown from '@/components/system/Dropdown.vue'

export default {
	name: "Navbar",
	components: {
        BaseDropdown
    },
	data() {
		return {
			menuOpened: false
		}
	},
	computed: {
		items() {
			return [
				{
					type: "link",
					url: "/projects",
					name: "Liste des projets",
				},
				{
					type: "link",
					url: "/contact",
					name: "Contact",
				},
				{
					type: "dropdown",
					name: this.$store.state.auth.user?.name,
					items: [
						{ label: "Mon compte", url: "/account" },
						{ label: "Dashboard", url: "/dashboard" },
						{ label: "Déconnexion", action: this.signout }
					],
					hide: !this.$store.state.auth.authenticated
				},
				{
					type: "callToAction",
					url: "/projects/create",
					name: "Créer un Projet",
					hide: !this.$store.state.auth.authenticated
				},
				{
					type: "callToAction",
					url: "/login",
					name: "Connexion",
					hide: this.$store.state.auth.authenticated
				},
			]
		}
	},
	methods: {
		toggleMenu() {
			this.menuOpened = !this.menuOpened;
			this.$refs.items.classList.toggle("open");
			this.$refs.button.classList.toggle("open");
		},

		signout() {
			AuthService.signout()
			this.$router.replace({ name: "Home" })
		}
	},
};
</script>

<style lang="scss" scoped>
.navbar {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	background-color: var(--color-black);
	z-index: 1000;
	@media screen and (min-width: 768px) {
		position: relative;
	}

	&__container {
		padding: space(2) 0;
		width: width(10);
		@include flex(row, space-between);
		@extend .mx-auto;
	}
	&__logo {
		max-width: space(12);
	}
	&__items {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: changeOpacity(map-get($colors, "black"), 0.8);
		transform: translateY(-100%);
		transition: transform 0.5s ease-in-out;
		@include flex(col, flex-start, flex-end);
		&.open {
			transform: translateY(0);
		}
		@include responsive("tablet") {
			background-color: transparent;
			position: static;
			top: initial;
			left: initial;
			width: auto;
			height: auto;
			transform: translate(0);
		}
		&-inner {
			@include flex(column, flex-start, flex-start);
			margin-bottom: space(35);
			margin-left: space(10);
			@include responsive("tablet") {
				background-color: transparent;
				@include flex();
				margin: 0;
				& > * + * {
					margin-left: space(4);
				}
			}
		}
	}
	&__item {
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
		.cta {
			@extend %btn;
			@extend %btn-secondary;
		}
		.btn {
			color: var(--color-white);
		}
	}
	&__burger {
		display: block;
		cursor: pointer;
		position: relative;
		z-index: 900;
		display: block;
		
		@include responsive("tablet") {
			display: none;
		}
	}
}
</style>
