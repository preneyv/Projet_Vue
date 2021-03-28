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
					<li class="navbar__link" @click="toggleMenu">
						<router-link to="/projects">Projets</router-link>
					</li>
					<li class="navbar__link" @click="toggleMenu">
						<router-link to="/about">A propos</router-link>
					</li>
					<li class="navbar__link" @click="toggleMenu">
						<router-link to="/projects/submit" class="button">
							Soumettre un projet
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: "Navbar",
	data() {
		return {
			menuOpened: false,
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
	position: relative;
	&__container {
		padding-top: space(2);
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
		background-color: changeOpacity($black, 0.8);
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
		@include responsive("tablet") {
			font-weight: 600;
			font-size: space(4.5);
			text-transform: initial;
		}
	}
	&__burger {
		display: block;
		cursor: pointer;
		position: relative;
		z-index: 900;
		display: block;
		width: space(7);
		height: space(7);
		background-color: var(--color-primary);
		border-radius: 50%;
		transition: border-radius 0.3s ease, transform 0.15s ease;
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
