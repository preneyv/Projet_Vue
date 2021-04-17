<template>
	<div class="head-collab">
		<span class="name-person" @click="isOptionOpened = !isOptionOpened">{{collab.name}}</span>
		<span v-if="$parent.$parent.getCurrentProject.stateUser === 'Admin'" class="remove-from-project" @click="handleClickRemove()"><i class="bi bi-box-arrow-right" :title="collab.name"></i>  Retirer du projet</span>
	</div>
	<transition name="growup-div">
		<div v-if="isOptionOpened===true" class="option-panel">
			<div class="list-type">
				<span class="list-type__line"
				v-for="(type,index) in collab.type" 
				:key="index">
				<span><i class="bi bi-gear"></i> {{getTypeCollab(type)}}</span>
				<span v-if="$parent.$parent.getCurrentProject.stateUser === 'Admin'" class="remove-from-project" @click="handleClickRemove(type)" :title="collab.name"><i class="bi bi-x"></i></span>
				</span>
			</div>

		</div>
	</transition>
</template>

<script>
//Files Import
import {profilTypes} from '../../constants/contributor.js'

export default {
	name: "CollabLine",
	data() {
		return {
			isOptionOpened : false
		}
	},
	props: {
		collab: Object,
		method: Function
	},
	methods: {
		/**
		 * Récupère le name associé à la clef dans profilTypes
		 */
		getTypeCollab(val) {
			return profilTypes[val]?.name ?? "inconnu"
		},
		/**
		 * Permet de gérer le clique sur le bouton de modification (le symbole du crayon)
		 */
		handleClickRemove(type){
			type !== undefined ? this.method(this.collab.id, this.collab.name, type) : this.method(this.collab.id, this.collab.name)
		}
	}  
}
</script>
<style lang="scss" scoped>
.name-person {
	font-size: 1rem;
	&:hover {
		cursor: pointer;
	}
}

	.head-collab {
    @include flex(row, space-between);

    .name-person {
      font-size: 1rem;

      &:hover {
        cursor: pointer;
      }
    }
  }

	.option-panel{
		font-size: 0.8rem;
		@include flex(row, space-between, unset);
		color: #969595;
		border-bottom: 1px solid lighten($color: #252525, $amount: 15);
		padding-top: 5px;
		width: 97%;
		float: right;

		.list-type {
			@include flex(column, flex-start, flex-start);
			width: 100%;

			&__line {
				@include flex(row,space-between);
				gap: 0.2rem;
				width: 100%;
			}
		}
	}

	.remove-from-project {
		font-size: 0.8rem;
		color: #969595;

		&:hover {
			cursor: pointer;
			text-decoration: underline;
		}
	}



/*Transition*/
.growup-div-enter-active,
.growup-div-leave-active {
	transition: opacity 0.5s ease;
}

.growup-div-enter,
.growup-div-leave-to {
	opacity: 0;
}
</style>