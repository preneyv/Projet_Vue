<template>
	<div class="list-ctn">
		<ItemListProject 
			v-for="pr in tabOfProject"
			:key="pr.id"
			:project="pr"
		/>
	</div>
</template>
<script>
import ItemListProject from '@/components/Dashboard/ItemListProject.vue'
export default {
	name:'ProjectList',
	components:{
		ItemListProject
	},
	props:{
		tabOfProject: Array
	}
}
</script>
<style lang="scss" scoped>

	.list-ctn{
		flex:1;
		background-color: #252525;
		border: 1px solid lighten($color: #252525, $amount: 15);
		height: 100%;
		overflow-y: auto;
		min-width: 260px;
		max-width: 380px;
		
	}

::-webkit-scrollbar {
 width: 5px;
 height: 5px;
}
::-webkit-scrollbar-thumb {
 background: #181818;
 border-radius: 9px;
}
::-webkit-scrollbar-thumb:hover{
 background: #7a787a;
}
::-webkit-scrollbar-track{
 background: #252525;
 border-radius: 0px;
 box-shadow: inset 7px 10px 12px #252525;
}
</style>