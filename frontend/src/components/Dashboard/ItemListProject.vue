<template>
	<div @click="switchProject(project._id)" :class="[{'item-list-ctn__isSelected' : isSelected }, 'item-list-ctn']">
		<div class="head-ctn">
			<span>{{project.title}}</span>
			<span :class="[project.stateUser==='Admin' ? 'userAdmin':'userCollab', 'sp-tag']">{{project.stateUser}}</span>
		</div>
		<div class="short-sumup">
			{{project.sumup}}
		</div>
		<div class="tag-ctn">
			<span class="tag sp-tag"
				v-for="(tag) in project.tags"
				:key="tag"
			>{{getNameTag(tag)}}</span>
		</div>
		<div class="foot-ctn">
			<span>{{project.licence}}</span>
			<span>{{formatedDate(project.lastUpdate)}}</span>
			<span>{{formatedDate(project.startedDate)}}</span>
		</div>
	</div>
</template>

<script>
//Import librairies
import format from 'date-format'

//Import Files
import {categories} from '../../constants/project.js'

export default {
	name: 'ItemListProject',
	props: {
		project: Object,
		nbSelectedProject: String,
		switchProject: Function
	},
	methods: {
		/**
		 * Retourne le name associé à la clef dans categories
		 */
		getNameTag(val) {
            return categories.find(({value}) => val === value).name   
        },
		/**
		 * Formate la date à l'aide de la librairie 'format'
		 */
		formatedDate(date) {
			return format('dd/MM/yyyy',new Date(date))
		}
	},
	computed: {
		/**
		 * Permet de savoir si le projet est séléctionné
		 */
		isSelected() {
			return this.nbSelectedProject === this.project._id ? true : false
		},
	}

}
</script>
<style lang="scss" scoped>

	.item-list-ctn{
		width:100%;
		height: auto;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		border-bottom: 1px solid lighten($color: #252525, $amount: 15);
		&:hover{
			cursor: pointer;
			background-color: #202120;
		}

		&__isSelected{
			background-color: #202120;
		}
	}

	.item-list-ctn:last-child{
		border:none
	}

	.head-ctn,.foot-ctn,.tag-ctn{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

	}
	.foot-ctn,.short-sumup{color: #969595;font-size: 0.7rem;padding: 4px 0;}
	.tag{background-color: #202120;}
	.sp-tag{
		padding:5px;
		border-radius: 3px;
		font-size: 0.8rem;
	}
	.userAdmin{background-color: #f44a4a;}
	.userCollab{background-color: #121284;}

</style>