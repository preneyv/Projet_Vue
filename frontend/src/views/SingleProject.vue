<template>
	<div class="project">
		<div class="project__container">
			<a @click="$router.go(-1)" class="go-back"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M19 12H6M12 5l-7 7 7 7" />
				</svg>
				<span>Retourner à la liste des projets</span></a
			>
			<div v-if="project.error">{{ project.error }}</div>
			<div v-else class="project__wrapper">
				<div class="project__main">
					<h1 class="project__title">{{ project.title }}</h1>
				</div>
				<ul class="project__sidebar">
					<li v-for="(url, name) in project.links" :key="name">
						<a :href="url">
							
							<font-awesome-icon :icon="['fab', `${name}`]" />
							{{ name }}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import config from "@/config.js";

import axios from "axios";
export default {
	data() {
		return {
			project: {
				error: "test",
			},
		};
	},
	mounted() {
		axios
			.get(`${config.API_URL}project/${this.$route.params.id}`)
			.then((res) => (this.project = res.data))
			.then((res) => console.log(res));
	},
};
</script>

<style lang="scss" scoped>
.project {
	margin-top: 2rem;
	&__container {
		width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	&__wrapper {
		display: flex;
		justify-content: space-between;
	}

	&__main {
		width: 80%;
	}

	&__sidebar {
		position: sticky;
		top: space(4);
		width: 15%;
		height: auto;
	}
}

.go-back {
	cursor: pointer;
	@include flex($type: inline-flex);
	span {
		margin-left: space(2);
	}
}
</style>
