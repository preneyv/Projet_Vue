<template>
    <section class="dashboard__container" v-if="dowloadError === false">
        <div :class="[{'isOpen' : isListOpened } ,'list-ctn']">
            <div v-if="listOfProject.length > 0" class="list-ctn__main">
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
        <!--<transition name="project-change" mode="out-in">-->
            <ProjectDash  :project="currentProject"/>
        <!--</transition>-->
    </section>
    <section v-else>Une erreur est survenue lors du chargement du Dashboard. Veuillez réessayez plus tard.</section>
</template>

<script>
import ItemListProject from '@/components/Dashboard/ItemListProject.vue'
import ProjectDash from '@/components/Dashboard/ProjectDash.vue'

import AdminAPI from '../utils/AdminAPI.js'

export default {
    name:"Dashboard",
    components:{
        ItemListProject,
        ProjectDash
    },
    beforeMount(){
        AdminAPI.getListProject("603c08ff76c5cf37b82d2ba3").then(res=>{
            this.listOfProject = res.data
            this.currentProject = this.listOfProject[0]
        }).catch(() => {
            this.dowloadError = true
        })  

    },
    data(){
        return{
            listOfProject:[],
            currentProject:null,
            isListOpened: false,
            dowloadError: false
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
        transform: translateX(-274px);
		flex:1;
		display: flex;
        position: relative;
        transition: .5s ease;

        &.isOpen {
            transform: translateX(0);
        }

        @include responsive("laptop"){
            transition: .5s ease;
            transform: translateX(0);
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
            top: 0;
        }

        .btn-open{
            display:block;
            font-size: 2rem;
            padding-left: 0.5rem;
            position: sticky;
            top: 0;
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