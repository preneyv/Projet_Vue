<template>
  <span v-if="isLoading" class="loadingDash"><div>Chargement...</div></span>
  <section class="dashboard__container" v-else-if="dowloadError === false">
      <div :class="[{'isOpen' : isListOpened } ,'list-ctn']" v-if="listOfProject.length > 0">
          <div  class="list-ctn__main" >
              <ItemListProject
                  v-for="pr in listOfProject"
                  :key="pr._id"
                  :project="pr"
                  :nbSelectedProject="currentProject._id"
                  :switchProject="changeProject"
              />
          </div>
          <div class="btn-open" @click="isListOpened = !isListOpened"><i  :class="[{'isOpen':isListOpened },'bi-arrow-right-square', 'bi']"></i></div>
      </div>
    <section v-else class="errorDowloadAPI"><div>Aucun projet n'a été trouvé. <router-link to="/projects/create">Créez en un !</router-link></div></section>
    <ProjectDash v-if="currentProject" :project="currentProject"/>
  </section>
  <section v-else class="errorDowloadAPI"><div>Une erreur réseau est survenue lors du chargement du Dashboard. Veuillez réessayez plus tard.</div></section>
</template>

<script>
import ItemListProject from '@/components/dashboard/ItemListProject.vue'
import ProjectDash from '@/components/dashboard/ProjectDash.vue'

import ProjectsService from '../../services/projects.js'

export default {
    name:"Dashboard",
    components:{
        ItemListProject,
        ProjectDash
    },
    beforeMount(){
        //const { _id } = this.$store.state.auth.user
        ProjectsService.getAuthorProjects().then(res=>{
          this.listOfProject = res.data
          this.currentProject = this.listOfProject[0]
          this.isLoading = false

        }).catch(() => {
          this.isLoading = false
          this.dowloadError = true
        })  

    },
    data(){
        return{
            listOfProject:[],
            currentProject:null,
            isListOpened: false,
            dowloadError: false,
            isLoading: true
        }
    },
    methods:{
		changeProject:function(id){
           this.currentProject= this.listOfProject.find(item => item._id === id)
           
		}
	}
}
</script>
<style lang="scss" scoped>
.errorDowloadAPI, .loadingDash{
    width: 100%;
    height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 2rem;
    

    div {
        background-color: #252525;
        border: 1px solid #4b4b4b;
        padding: 0.5rem;
    }
}
.dashboard {
	&__container {
		display: flex;
		height: 100%;
		width: 100%;
		@include gap(2);
		padding: 10px;
		position: relative;
	

    /*List Projects Part*/
    
    .list-ctn{
      margin-left: -274px;
      flex:1;
      display: flex;
      position: relative;
      transition: .5s ease;

      &.isOpen {
        margin-left: 0;
      }

      @include responsive("laptop"){
        transition: .5s ease;
        margin-left: 0;
      }

      &__main{
        background-color: #252525;
        border: 1px solid #4b4b4b;
        height: 100%;
        width: 100%;
        overflow-y: auto;
        min-width: 260px;
        max-width: 380px;
        max-height: 100vh;
        position: sticky;
        top: 4rem;
      }

      .btn-open{
        display:block;
        font-size: 2rem;
        padding-left: 0.5rem;
        position: sticky;
        top: 4rem;
        max-height: 100vh;
        &:hover{
          cursor: pointer;
        }

        i{
          transition: .5s ease;
          display: block;
          &.isOpen {
            transform: rotate(90deg);

          }
        }
        @include responsive("laptop"){
            display: none;
        }
      }
		
	}
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