<template>
	<div class="heading">
		<h1>Tous les projets</h1>
		<p>
			{{ projects.length }}
			{{ projects.length !== 1 ? "disponibles" : "disponible" }}
		</p>
		<div class="heading__search-container">
			<BaseInput
				type="text"
				placeholder="Rechercher..."
			/>
		</div>
	</div>
	<div class="projects">
		<router-link
			class="projects__card"
			v-for="project in projects"
			:key="project._id"
			:to="{
				name: 'Project',
				params: {
					id: project._id,
				},
			}"
		>
			<h2 class="projects__title">{{ project.title }}</h2>
			<p v-if="project.description" class="projects__description">
				{{ project.description.substring(0, 150) + "..." }}
			</p>
			<div v-if="project.tags > '0'" class="projects__tags">
				<h3>tags</h3>
				<ul>
					<li v-for="(tag, index) in project.tags" :key="`key-${index}`">
						<span>{{ tag }}</span>
					</li>
				</ul>
			</div>
		</router-link>
	</div>
</template>

<script>
import ProjectsService from "@/services/projects.js"
import BaseInput from "@/components/system/Input"
export default {
	name: "ListProjects",
	components: {
		BaseInput
	},
	data() {
		return {
			projects: [],
		};
	},
	async mounted() {
		const { data } = await ProjectsService.getAllProjects();
		this.projects = data;
	},
};
</script>

<style lang="scss" scoped>
.heading {
	text-align: center;
	h1 {
		font-size: 4rem;
		font-weight: 700;
	}
	p {
		margin-top: space(1);
		opacity: 0.8;
		text-transform: uppercase;
		font-size: 1.5rem;
	}
	&__search-container {
		margin: 1rem auto 0 auto;
		width: 90%;
		max-width: 450px;
	}
}
.projects {
	margin-top: space(8);
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(space(64), 1fr));
	gap: space(3);
	padding: 0 8vw;
	&__card {
		overflow: hidden;
		color: var(--color-black);
		display: grid;
		grid-template-rows: space(12) space(24) auto;
		gap: space(2);
		border-radius: space(2);
		background-color: darken(map-get($colors, "white"), 5%);
		box-shadow: 0 0 2px white;
		transition: box-shadow 100ms ease-in-out;
		&:hover {
			box-shadow: 0 0 5px white;
		}
		h2 {
			margin: space(3) space(3) 0;
			text-align: center;
			font-size: 1rem;
			font-weight: 600;
			margin-bottom: space(2);
		}
	}
	&__tags {
		background-color: var(--color-dark-black);
		color: var(--color-white);
		padding: space(3) space(3);
		align-self: flex-end;
		h3 {
			text-transform: uppercase;
			font-weight: bold;
		}
		ul {
			display: flex;
			flex-wrap: wrap;
		}
		li {
			margin: space(1);
			span {
				display: inline-block;
				padding: space(1) space(3);
				border-radius: space(5);
				background-color: var(--color-white);
				color: var(--color-black);
			}
		}
	}
	&__description {
		margin: 0 space(3);
		align-self: flex-start;
	}
}
</style>
