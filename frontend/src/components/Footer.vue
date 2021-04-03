<template>
	<footer class="footer">
		<div class="footer__container">
			<div class="row">
				<h3 class="footer__copyright h-4">
					Tous droits réservés © {{ new Date().getFullYear() }}
				</h3>
				<ul class="footer__legals">
					<li><a href="#">Politique de confidentialité</a></li>
					<li><a href="#">Mentions légales</a></li>
				</ul>
			</div>
			<div class="footer__creators row">
				<h4>Made with love by</h4>
				<div class="row">
					<div
						v-for="creator in creators"
						:key="creator.github"
						class="footer__creator"
					>
						<a :href="creator.github" rel="noopener" target="_blank">
							<h5>{{ creator.name }}</h5>
							<i class="bi bi-github"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
export default {
	name: "Footer",
	data() {
		return {
			creators: [
				{
					name: "Aurélien",
					github: "https://github.com/aurelien-robineau",
				},
				{
					name: "Hippolyte",
					github: "https://github.com/hsoulier",
				},
				{
					name: "Valère",
					github: "https://github.com/preneyv",
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.footer {
	background-color: lighten(map-get($colors, "black"), 5%);
	padding: space(10) 0;
	&__container {
		width: width(10);
		@extend .mx-auto;
		@include flex(column);
	}
	.row {
		width: 100%;
		@include flex();
		flex-wrap: wrap;
		& > *+* {
			margin-left: space(3);
		}
	}
	&__creators {
		margin-top: space(6);
		flex-direction: column;
		h4 {
			opacity: 0.45;
			margin-bottom: space(1);
			text-transform: uppercase;
		}
	}
	&__creator a {
		display: inline-flex;
		opacity: 0.65;
		& > * + * {
			margin-left: space(2);
		}
	}
	&__legals {
		a {
			font-weight: light;
		}
		display: inline-flex;
		& > * + * {
			margin-left: space(3);
		}
	}
}
</style>
