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
				@input="onResearch"
			/>
		</div>
		<div class="heading__filters-container">
			<BaseSelect
				id="projects-licenses"
				name="licenses"
				placeholder="Types de licence"
				:items="licenses"
				multiple
				@change="e => onFilterChange(e, 'licenses')"
			/>
			<BaseSelect
				id="projects-categories"
				name="categories"
				placeholder="Catégories"
				:items="categories"
				multiple
				@change="e => onFilterChange(e, 'tags')"
			/>
			<BaseSelect
				id="projects-profiles"
				name="profiles"
				placeholder="Profils recherchés"
				:items="profilTypes"
				multiple
				@change="e => onFilterChange(e, 'profiles')"
			/>
		</div>
	</div>
	<div v-if="projectsToDisplay.length !== 0" class="projects">
		<router-link
			class="projects__card"
			v-for="project in projectsToDisplay"
			:key="project._id"
			:to="{
				name: 'Project',
				params: {
					id: project._id,
				},
			}"
		>
			<h2 class="projects__title">{{ project.title }}</h2>
			<p class="projects__description">
				{{ project.truncatedSumup }}
			</p>
			<div class="projects__tags">
				<h3>Tags</h3>
				<ul v-if="project.tags > '0'">
					<li v-for="(tag, index) in project.tags" :key="`tag-${index}`">
						<span :class="filters.tags.includes(tag) ? 'match-research': ''">
							{{ categories.filter(category => category.value === tag)[0]?.name ?? tag }}
						</span>
					</li>
				</ul>
				<span v-else>Aucun</span>

				<h3>Jobs</h3>
				<ul v-if="project.jobs > '0'">
					<li v-for="(job, index) in project.jobs" :key="`job-${index}`">
						<span :class="filters.profiles.includes(job.type) ? 'match-research': ''">
							{{ profilTypes.filter(profilType => profilType.value === job.type)[0]?.name ?? job.type }}
						</span>
					</li>
				</ul>
				<span v-else>Équipe au complet</span>
			</div>
		</router-link>
	</div>
	<div v-else class="projects-no-results">
		{{ loading ? "Chargement..." : "Aucun résultat" }}
	</div>
</template>

<script>
import ProjectsService from "@/services/projects.js"
import BaseInput from "@/components/system/Input"
import BaseSelect from "@/components/system/Select"
import { licenses, categories } from "@/constants/project.js";
import { profilTypes } from "@/constants/contributor.js";
export default {
	name: "ListProjects",
	components: {
		BaseInput,
		BaseSelect
	},
	data() {
		return {
			loading: true,
			licenses,
			categories,
			profilTypes: Object.keys(profilTypes).map((key) => ({
				value: key,
				...profilTypes[key],
			})),
			research: null,
			filters: {
				tags: [],
				licenses: [],
				profiles: []
			},
			projects: [],
		};
	},
	computed: {
		projectsToDisplay() {
			return this.projects.filter(project => (
					(this.research !== "" ? project.title.toLowerCase().includes(this.research) : true)
					&& (this.filters.tags.length === 0 || this.filters.tags.some(tag => project.tags?.includes(tag)))
					&& (this.filters.licenses.length === 0 || this.filters.licenses.includes(project.licence))
					&& (this.filters.profiles.length === 0 || this.filters.profiles.some(profile => project.jobs.filter(job => job.type === profile).length !== 0))
				)
			)
		}
	},
	methods: {
		onResearch(event) {
			this.research = event.target.value.trim().toLowerCase()
		},

		onFilterChange(event, filterName) {
			this.filters[filterName] = event.target.getValues()
		}
	},
	async mounted() {
		const { data } = await ProjectsService.getAllProjects();

		data.forEach(project => {
			const sumup = project.sumup ?? ""
			let truncatedSumup = sumup.substring(0, 150)
			if (sumup.length > 150)
				truncatedSumup += "..."
			
			project.truncatedSumup = truncatedSumup
		});

		this.projects = data
		this.research = ""
		this.loading = false
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
	&__search-container, &__filters-container {
		margin: 1rem auto 0 auto;
		width: 90%;
		max-width: 450px;
	}
	&__filters-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;

		& > *:not(:last-child) {
			max-width: 49%;
			margin-bottom: 0.5rem;
		}
	}
}
.projects {
	margin-top: space(8);
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(space(80), 1fr));
	gap: space(3);
	padding: 0 8vw;
	&__card {
		max-width: space(88);
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
			span.match-research {
				background-color: var(--color-success);
			}
		}
	}
	&__description {
		margin: 0 space(3);
		align-self: flex-start;
	}
}
.projects-no-results {
	text-align: center;
	margin-top: 5rem;
}
</style>
