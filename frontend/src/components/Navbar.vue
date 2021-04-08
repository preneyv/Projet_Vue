<template>
	<nav class="navbar">
		<div class="navbar__container">
			<div class="navbar__logo">
				<router-link to="/">
					<img src="../assets/logo.png" alt="Logo Vue" />
				</router-link>
			</div>
			<div @click="toggleMenu" class="navbar__burger" ref="button"></div>
			<div class="navbar__links" ref="links">
				<ul class="navbar__links-inner">
					<li
						v-for="link in links.filter(link => !link.hide)"
						:key="link.url"
						class="navbar__link"
						@click="toggleMenu"
					>
						<router-link :to="link.url" :class="{ cta: link.cta }">{{
							link.name
						}}</router-link>
					</li>

					<li v-if="isSignedIn" class="navbar__link">
						<BaseDropdown
							:label="accountDropdown.label"
							:items="accountDropdown.items"
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
			links: [
				{
					url: "/projects",
					name: "Liste des projets",
				},
				{
					url: "/projects/submit",
					name: "Créer un Projet",
					cta: true,
				},
				{
					url: "/login",
					name: "Connexion",
					cta: true,
					hide: AuthService.isSignedIn()
				},
			],
			accountDropdown: {
				label: AuthService.getUser()?.name,
				items: [
					{ label: "Mon compte", url: "/account" },
					{ label: "Dashboard", url: "/dashboard" },
					{ label: "Déconnexion", action: () => {
						AuthService.signout()
						this.$router.push("/")
						window.location.reload()
					}}
				]
			},
			menuOpened: false,
			isSignedIn: AuthService.isSignedIn()
		};
	},
	methods: {
		toggleMenu() {
			this.menuOpened = !this.menuOpened;
			this.$refs.links.classList.toggle("open");
			this.$refs.button.classList.toggle("open");
		},
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
	&__links {
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
			margin-bottom: space(20);
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
	&__link {
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
		width: space(8);
		height: space(8);
		background-color: var(--color-primary);
		border-radius: 50%;
		transition: border-radius 0.3s ease-in-out, transform 0.15s ease;
		&:hover {
			transform: scale(1.2);
		}
		@include responsive("tablet") {
			display: none;
		}
		&.open {
			border-radius: 0;
		}
	}
}
</style>
