<template>
	<div class="item-list-ctn">
		<div class="head-ctn">
			<span>{{project.title}}</span>
			<span :class="[project.stateUser==='Admin' ? 'userAdmin':'userCollab', 'sp-tag']">{{project.stateUser}}</span>
		</div>
		<div class="short-sumup">
			{{project.sumup}}
		</div>
		<div class="tag-ctn">
			<span class="tag sp-tag"
				v-for="(tag, index) in project.tags"
				:key="index"
			>{{tag}}</span>
		</div>
		<div class="foot-ctn">
			<span>{{project.licence}}</span>
			<span>{{project.lastUpdate}}</span>
			<span>{{project.startedDate}}</span>
		</div>
	</div>
</template>

<script>
export default {
	name:'ItemListProject',
	props:{
		project:Object
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
	}
	.item-list-ctn:last-child{
		border:none
	}

	.head-ctn,.foot-ctn,.tag-ctn{
		display: flex;
		justify-content: space-between;
		align-items: center;

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