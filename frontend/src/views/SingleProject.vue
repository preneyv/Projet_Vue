<template>
	<div class="project">
		<div v-if="project.error">{{ project.error }}</div>
		<div v-else class="project__container">
			<h1 class="project__title">{{ project.title }}</h1>
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
				error: "test"
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
