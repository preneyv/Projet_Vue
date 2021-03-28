<template>
	<div
		@click="selectProject(project._id)"
		:class="[{ selected: isSelected }, 'item-project__container']"
	>
		<div class="item-project__header">
			<span>{{ project.title }}</span>
			<span
				:class="[
					project.stateUser === 'Admin' ? 'userAdmin' : 'userCollab',
					'sp-tag',
				]"
				>{{ project.stateUser }}</span
			>
		</div>
		<div class="item-project__summary">
			{{ project.sumup }}
		</div>
		<div class="item-project__tags">
			<span class="tag sp-tag" v-for="tag in project.tags" :key="tag">{{
				getNameTag(tag)
			}}</span>
		</div>
		<div class="item-project__footer">
			<span>{{ project.licence }}</span>
			<span>{{ formatedDate(project.lastUpdate) }}</span>
			<span>{{ formatedDate(project.startedDate) }}</span>
		</div>
	</div>
</template>

<script>
import format from "date-format";
import { categories } from "../../constants/project.js";

export default {
	name: "ItemListProject",
	props: {
		project: Object,
		nbSelectedProject: String,
	},
	methods: {
		getNameTag: function (val) {
			return categories.find(({ value }) => val === value).name;
		},
		selectProject: function (id) {
			this.bus.emit("handleChangeProject", id);
		},

		formatedDate(date) {
			return format("dd/MM/yyyy", new Date(date));
		},
	},
	computed: {
		isSelected() {
			return this.nbSelectedProject === this.project._id ? true : false;
		},
	},
};
</script>
<style lang="scss" scoped>
.item-project {
	&.selected {
		background-color: #202120;
	}
	&__container {
		width: 100%;
		height: auto;
		@include flex(column, normal, normal);
		padding: space(4);
		border-bottom: 1px solid lighten($color: #252525, $amount: 15);
		&:hover {
			cursor: pointer;
			background-color: #202120;
		}
		&:last-child {
			border: none;
		}
	}
	.tag {
		background-color: #202120;
	}
	.sp-tag {
		padding: space(1);
		border-radius: 3px;
		font-size: 0.8rem;
	}
	.userAdmin {
		background-color: #f44a4a;
	}
	.userCollab {
		background-color: #121284;
	}
	&__header,
	&__footer,
	&__tags {
		@include flex(row, space-between, center);
		flex-wrap: wrap;
	}
	&__footer,
	&__summary {
		color: #969595;
		font-size: 0.7rem;
		padding: 4px 0;
	}
}
</style>