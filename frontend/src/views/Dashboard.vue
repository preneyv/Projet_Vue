<template>
	<section class="dashboard__container">
		<div class="dashboard__projects">
			<ItemListProject
				v-for="pr in listOfProject"
				:key="pr._id"
				:project="pr"
				:nbSelectedProject="currentProject._id"
			/>
		</div>
		<!--<transition name="project-change" mode="out-in">-->
		<ProjectDash :project="getCurrentProject" />
		<!--</transition>-->
	</section>
</template>

<script>
import ItemListProject from "@/components/Dashboard/ItemListProject.vue";
import ProjectDash from "@/components/Dashboard/ProjectDash.vue";
import AdminAPI from "../components/Dashboard/AdminAPI.js";

export default {
	name: "Dashboard",
	components: {
		ItemListProject,
		ProjectDash,
	},
	beforeMount() {
		AdminAPI.getListProject("603c08ff76c5cf37b82d2ba3").then((res) => {
			this.listOfProject = res.data;
			this.currentProject = this.listOfProject[0];
		});
		this.bus.on("handleChangeProject", (id) => this.changeProject(id));
	},
	data() {
		return {
			listOfProject: [],
			currentProject: null,
		};
	},
	computed: {
		getCurrentProject() {
			return this.currentProject;
		},
	},
	methods: {
		changeProject: function (id) {
			this.currentProject = this.listOfProject.find((item) => item._id === id);
		},
	},
};
</script>
<style lang="scss" scoped>
.dashboard {
	&__container {
		display: grid;
        grid-template-columns: 1fr 4fr;
		height: 100%;
		width: 100%;
		@include gap(2);
		padding: 10px;
		position: relative;
	}
	&__projects {
		background-color: #252525;
		border: 1px solid lighten($color: #252525, $amount: 15);
		height: 100%;
		overflow-y: auto;
		min-width: 260px;
		max-width: 380px;
		max-height: 100vh;
	}
}

.project-change-enter-active,
.form-change-leave-active {
	transition: all 0.3s ease-in-out;
}

.project-change-enter,
.form-change-leave-to {
	transform: translateX(100%);
}
</style>