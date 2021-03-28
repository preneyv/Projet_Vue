<template>
	<div class="heading">
		<h1>Tous les projets</h1>
		<p>
			{{ projects.length }}
			{{ projects.length > 1 ? "disponibles" : "disponible" }}
		</p>
	</div>
	<div class="project">
		<router-link
			class="project__card"
			v-for="project in projects"
			:key="project._id"
			:to="{
				name: 'Project',
				params: {
					id: project._id,
					title: project.title,
					author: project.author,
					description: project.description,
					contact: project.ontact,
					tags: project.tags,
					jobs: projects.jobs,
					licence: project.licence,
				},
			}"
		>
			<h2 class="project__title">{{ project.title }}</h2>
			<p v-if="project.description" class="project__description">
				{{ project.description.substring(0, 150) + "..." }}
			</p>
			<div v-if="project.tags > '0'" class="project__tags">
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
import axios from "axios";
import config from "@/config.js";
export default {
	name: "Projects",
	data() {
		return {
			projects: [],
		};
	},
	mounted() {
		axios
			.get(`${config.API_URL}project`)
			.then((response) => (this.projects = response.data))
			.then((response) => console.log(response));
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
.project {
	margin-top: space(8);
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	gap: space(3);
	&__card {
		display: grid;
		grid-template-rows: repeat(3, auto);
		gap: space(2);
		padding: space(2);
		border-radius: space(2);
		border: 1px solid lighten($black, 20%);
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
				background-color: lighten($black, 20%);
				border: 1px solid lighten($black, 20%);
			}
		}
	}
	&__description {
		align-self: flex-start;
	}
}
</style>
