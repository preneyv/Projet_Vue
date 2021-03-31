<template>
	<div class="heading">
		<h1>Tous les projets</h1>
		<p>
			{{ projects.length }}
			{{ projects.length > 1 ? "disponibles" : "disponible" }}
		</p>
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
import ProjectsService from "@/services/projects.js";
export default {
	name: "Projects",
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
}
.projects {
	margin-top: space(8);
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(space(64), 1fr));
	gap: space(3);
	&__card {
		color: var(--color-black);
		display: grid;
		grid-template-rows: space(12) space(24) auto;
		gap: space(2);
		padding: space(3);
		border-radius: space(2);
		background-color: var(--color-white);
		// border: 1px solid lighten($black, 20%);
		h2 {
			text-align: center;
			font-size: 1rem;
			font-weight: 600;
			margin-bottom: space(2);
		}
	}
	&__tags {
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
				padding: space(1);
				border-radius: space(2);
				border: 1px solid lighten($black, 20%);
			}
		}
	}
	&__description {
		align-self: flex-start;
	}
}
</style>
