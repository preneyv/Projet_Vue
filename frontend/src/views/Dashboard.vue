<template>
	<section>
		<ProjectList :tabOfProject="listOfProject"/>
		<ProjectDash />
	</section>
</template>

<script>
import ProjectList from '@/components/Dashboard/ProjectList.vue'
import ProjectDash from '@/components/Dashboard/ProjectDash.vue'

export default {
	name:"Dashboard",
	components:{
		ProjectList,
		ProjectDash
	},
	data(){
		return{
			listOfProject:[
				{
					id:0,
					title:"Alarme Web Mobile",
					stateUser:"Admin",
					licence:"Licence 2",
					lastUpdate:"03/01/2020",
					startedDate:"01/01/2020",
					tags:['Git',"Java","Meca","Alarme","Domotique"],
					sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
					Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
					ea nisi.`
				},
				{
					id:1,
					title:"Alarme Web Mobile",
					stateUser:"Admin",
					licence:"Licence 2",
					lastUpdate:"03/01/2020",
					startedDate:"01/01/2020",
					tags:['Git',"Java","Meca","Alarme","Domotique"],
					sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
					Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
					ea nisi.`
				},
				{
					id:2,
					title:"Alarme Web Mobile",
					stateUser:"Collab",
					licence:"Licence 2",
					lastUpdate:"03/01/2020",
					startedDate:"01/01/2020",
					tags:['Git',"Java","Meca","Alarme","Domotique"],
					sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
					Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
					ea nisi.`
				},
				{
					id:3,
					title:"Alarme Web Mobile",
					stateUser:"Admin",
					licence:"Licence 2",
					lastUpdate:"03/01/2020",
					startedDate:"01/01/2020",
					tags:['Git',"Java","Meca","Alarme","Domotique"],
					sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
					Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
					ea nisi.`
				},
				{
					id:4,
					title:"Alarme Web Mobile",
					stateUser:"Collab",
					licence:"Licence 2",
					lastUpdate:"03/01/2020",
					startedDate:"01/01/2020",
					tags:['Git',"Java","Meca","Alarme","Domotique"],
					sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
					Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
					ea nisi.`
				},
				{
					id:5,
					title:"Alarme Web Mobile",
					stateUser:"Collab",
					licence:"Licence 2",
					lastUpdate:"03/01/2020",
					startedDate:"01/01/2020",
					tags:['Git',"Java","Meca","Alarme","Domotique"],
					sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
					Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
					ea nisi.`
				},
			]
		}
	}
}
</script>
<style lang="scss" scoped>

	section{
		display: flex;
		height:100%;
		width:100%;
		gap: 10px;
		padding: 10px;
		max-height: calc(100vh - 62px);
		
	}

</style>