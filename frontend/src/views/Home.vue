<template>
	<div class="home">
		<div class="hero-section">
			<div class="hero-section__container">
				<div class="hero-section__text" ref="text">
					<h1>Le Marché de <span>l'Open Source</span></h1>
					<h2>Propulser des projets Open-Source en y participant</h2>
					<router-link to="projects"
						>Voir l'ensemble des projets</router-link
					>
				</div>
				<div class="hero-section__img" ref="img">
					<img src="@/assets/hero.png" alt="Rocket Woman ✨" />
				</div>
			</div>
		</div>
		<div class="about">
			<div class="about__container container" ref="about">
				<h2>Concept</h2>
				<p>
					Cette idée est venue d'un constat simple: si des gens
					veulent participer à des projets open-source, il n'y a pas
					de site sur lequel ils sont référencés. <br />
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Doloremque tempora amet unde pariatur ad molestias, ea sunt
					veritatis fugiat! Repudiandae possimus fugiat voluptatum nam
					reprehenderit est esse commodi quis perspiciatis nihil
					aperiam tenetur, hic unde suscipit! Repudiandae quidem,
					aperiam ea corporis sequi id eligendi quasi in ipsa
					accusantium, impedit numquam pariatur exercitationem dolore
					nesciunt aspernatur voluptas laudantium. Nobis sapiente
					omnis eveniet fuga alias saepe tenetur voluptas, fugit
					soluta quos repellat laborum eligendi natus aliquam
					architecto. Temporibus officia provident error assumenda.
					Assumenda quo commodi eveniet expedita, debitis nulla quos
					quaerat ab et. Id cum, in sunt voluptatum delectus eligendi
					enim quisquam!
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import gsap from "gsap"
	export default {
		name: "Home",
		mounted() {
			const { text, img, about } = this.$refs

			const tl = gsap.timeline()
			tl.to(text.children, {
				y: 0,
				opacity: 1,
				stagger: 0.2,
			})
				.to(
					img,
					{
						x: 0,
						opacity: 1,
					},
					"-=.4"
				)
				.to(
					about.children,
					{
						y: 0,
						opacity: 1,
						stagger: 0.2,
					},
					"+=1"
				)
		},
	}
</script>

<style lang="scss">
	.home {
		padding-bottom: space(8);
	}
	.hero-section {
		height: 80vh;
		max-height: space(200);
		// @include responsive("tablet") {
		// 	max-height: space(130);
		// }
		display: grid;
		place-items: center;
		&__container {
			margin: space(8) auto 0;
			width: 80%;
			max-width: space(440);
			@include flex();
			flex-direction: column-reverse;
			@media screen and (min-width: 767px) {
				flex-direction: row;
			}
		}
		&__text {
			flex: 1 0 auto;
			width: 60%;
			font: 900 space(20) / 1 var(--typo-title);
			@media screen and (max-width: 767px) {
				width: 100%;
			}
			h1 {
				font-size: clamp(#{space(8)}, 5vmax, #{space(20)});

				margin-bottom: space(5);
				span {
					color: var(--color-primary);
					animation: change-color 2s linear alternate-reverse infinite;

					@keyframes change-color {
						from {
							color: var(--color-primary);
						}
						to {
							color: var(--color-secondary);
						}
					}
				}
			}
			h2 {
				@media screen and (max-width: 767px) {
					width: 100%;
				}
				font-size: clamp(#{space(5)}, 3vmax, #{space(8)});
				width: 95%;
				line-height: 1.25;
				font-weight: 600;
			}
			a {
				@media screen and (max-width: 767px) {
					width: 100%;
				}
				padding: space(3) space(4);
				font: 600 space(5) / 1 var(--typo-text);
				border-radius: space(2);
				font-size: clamp(#{space(4)}, 1vmax, #{space(5)});
				background: var(--color-secondary);
			}
			& > * {
				transform: translateY(20px);
				opacity: 0;
			}
		}
		&__img {
			@media screen and (max-width: 767px) {
				margin-bottom: space(6);
				max-width: space(80);
			}
			transform: translateX(-50px);
			opacity: 0;
			margin-bottom: 0;
			margin-left: space(4);
			padding: space(4);
			border-radius: space(80);
			background: radial-gradient(
				circle,
				var(--color-primary) 0%,
				var(--color-secondary) 100%
			);
			flex: 0 1 auto;
			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				animation: translate 2s infinite alternate-reverse ease-in-out;
			}
			@keyframes translate {
				from {
					transform: translate(space(-2), space(0));
				}
				to {
					transform: translate(space(0), space(-2));
				}
			}
		}
	}
	.about {
		margin: space(16) 0;
		&__container {
			max-width: space(200);
			margin-left: auto;
			margin-right: auto;
			& > * {
				transform: translateY(20px);
				opacity: 0;
			}
		}
		h2 {
			font: 900 space(15) var(--typo-title);
			text-align: center;
			margin-bottom: space(4);
		}
	}
</style>
