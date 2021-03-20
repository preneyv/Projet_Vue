<template>
    <div class="project-ctn">
        <div class="section left-section">
            <div class="title-ctn"><h2>{{projectLocal.title}}</h2></div>
            <div class="state-collab-ctn">
                <div class="state-collab-ctn__head">
                    <span>Etat des collaborations</span>
                    <i class="bi bi-plus-square add-btn" v-if="projectLocal.stateUser=== 'Admin'" title="Ajouter un nouveau besoin de collaboration" @click="changeFormAndOpen(formAddCollab)"></i>
                </div>
                <div class="state-collab-ctn__main">
                    <Tile 
                    v-for="(col,index) in projectLocal.jobs"
                    :key="index"
                    v-bind="col"
                    />
                </div>
            </div>
        </div>
        <div class="section middle-section">
            <BasicCtn headTitle="Description">
                <div :class="[projectLocal.description ? '' : 'no-desc', 'description']" >{{projectLocal.description ? projectLocal.description : "Pas de détail"}}</div>
            </BasicCtn>
            <BasicCtn headTitle="Journal de bord">
            </BasicCtn>
            <BasicCtn headTitle="Catégories">
                <template v-slot:btnHead><i v-if="projectLocal.stateUser=== 'Admin'" class="bi bi-plus-square add-btn" title="Ajouter une nouvelle catégorie" @click="changeFormAndOpen(formAddTag)"></i></template>
                <div class="tag-ctn">
                    <span 
                        v-for="(tag) in projectLocal.tags"
                        :key="tag"
                    >{{getNameTag(tag)}}
                    </span>
                </div>
            </BasicCtn>
        </div>
        <div class="section right-section">
            <BasicCtn headTitle="Etat du projet">
                <template v-slot:btnHead><input class="btn-head-stateproject" type="button" :value="project.stateUser=== 'Admin' ? 'Supprimer le projet' : 'Se retirer du projet'"/></template>
                <div class="stateproject-ctn">
                    <div class="stateproject-ctn__firstline">
                        <span>{{projectLocal.stateUser=== 'Admin' ? "Vous êtes administrateur sur le projet." : "Vous êtes collaborateur sur le projet"}}</span>
                        <input v-if="project.stateUser=== 'Admin'" class="btn-end-project" type="button" value="Déclarer terminé"/>
                    </div>
                    <div class="stateproject-ctn__lastline">
                        <span>{{projectLocal.licence}}</span>
                        <span>{{projectLocal.stateProject}}</span>
                        <span>Créé le {{formatedDate(projectLocal.startedDate)}}</span>
                    </div>
                </div>
            </BasicCtn>
            <BasicCtn headTitle="Liste des collaborateurs">
                <div class="collabs-ctn">
                    <div v-for="(collab,index) in getAllCollabsNames"
                    :key="index"
                    class="collab-line">
                        <CollabsLine :collabName="collab" />
                    </div>
                </div>
            </BasicCtn>
            <BasicCtn headTitle="Liens utiles">
                <template v-slot:btnHead><i v-if="projectLocal.stateUser=== 'Admin'" class="bi bi-plus-square add-btn" title="Ajouter une nouvelle catégorie" @click="changeFormAndOpen(formAddLinks)"></i></template>
                <div class="links-ctn">
                    <div class="link-item"
                        v-for="(link,index) in projectLocal.links"
                        :key="index"
                    >
                        <span>{{link.title}}</span>
                        <span>{{link.value}}</span>
                    </div>
                </div>
            </BasicCtn>
        </div>
    <FormHandlingAdd v-if="requiredForm!==null" v-bind="requiredForm"/>
        

    </div>
    
</template>
<script>
import Tile from '@/components/Dashboard/Tile.vue'
import BasicCtn from '@/components/Dashboard/BasicCtn.vue'
import CollabsLine from '@/components/Dashboard/CollabsLine.vue'
import FormHandlingAdd from '@/components/Dashboard/BasicsForms/FormHandlingAdd.vue'
import AddTag from '@/components/Dashboard/BasicsForms/AddTag.vue'
import AddLinks from '@/components/Dashboard/BasicsForms/AddLinks.vue'
import AddCollabs from '@/components/Dashboard/BasicsForms/AddCollabs.vue'
import { markRaw } from 'vue'
import format from 'date-format'
import {categories} from '../../constants/project.js'

import AdminAPI from './AdminAPI.js'
export default {
    name:'ProjectDash',
    components:{
        Tile,
        BasicCtn,
        CollabsLine,
        FormHandlingAdd
  
    },
    data(){
        return{
            projectLocal : this.project,
            requiredForm:null,
            formAddCollab:{
                title:'Besoin de nouvelles collaborations ?',
                method:this.newCollab,
                form:markRaw(AddCollabs),  
                
            },
            formAddTag:{
                
                title:'Une nouvelle catégorie ?',
                method:this.newTag,
                form: markRaw(AddTag), 
            },
            formAddLinks:{
                title:'Ajouter un autre lien',
                method:this.newLink,
                form: markRaw(AddLinks), 
            }
        }    
    },
    props:{
        project:Object
    },
    computed:{
        getAllCollabsNames : function(){
            let tabCollabs = []
            if(this.projectLocal.jobs){
                this.projectLocal.jobs.forEach(({type, nameCollabPeople}) => {
                    nameCollabPeople.forEach(collab => {
                        if(tabCollabs.find((obj) => obj.name===name) === undefined)
                            tabCollabs.push({name:collab.name,type:type,id:collab._collab})
                        
                    })
                })
            }
            return tabCollabs
        },

        getStateUser : function(){
            return this.projectLocal.stateUser === "Admin" ? "Admin" : "Collab"
        },
        
    },
    methods:{
        getNameTag : function(val){
            console.log(val)
            return categories.find(({value}) => val === value).name
            
        },
        closeForm : function(){
            this.requiredForm=null
        },
        changeFormAndOpen:function(el){
            this.requiredForm = el
        },
        formatedDate(date){
			return format('dd/MM/yyyy',new Date(date))
			
		},
        newCollab({valueType, valueTechno, valueNb}){

            this.projectLocal.jobs.forEach((el) =>{
                if(el.type === valueType)
                    return ({message:'Cette collaboration est déjà définie dans le projet.'})      
            })

            this.projectLocal.jobs = [...this.projectLocal.jobs,{type:valueType,requiredNb:valueNb,skills:valueTechno,nameCollabPeople:[]}]
        },
        newTag({valueTag}){

            if(this.projectLocal.tags.includes(valueTag))
                return ({message:'Cette catégorie est déjà présente dans votre projet.'})

            this.projectLocal.tags = [...this.projectLocal.tags,valueTag]
            AdminAPI.addTagToProject(this.projectLocal._id,valueTag)
                    .then((res)=> {
                        console.log(res)
                    })
        },
        newLink({valueSelect, valueInput}){
            
            this.projectLocal.links.forEach((el) =>{
                if(el.title === valueSelect && el.value === valueInput)
                    return ({message:'Ce lien est déjà présent dans votre projet.'})      
            })

            this.projectLocal.links = [...this.projectLocal.links,{title:valueSelect,value:valueInput}]
            AdminAPI.addLinkToProject(this.projectLocal._id,{title:valueSelect,value:valueInput})
        }
    }



}
</script>
<style lang="scss" scoped>

/*MAIN CONFIG*/
    .project-ctn{
        flex:4;
        background-color: #252525;
        border: 1px solid lighten($color: #252525, $amount: 15);
        height:100%;
        display:flex;
        flex-direction: column;
        padding:1rem;
        gap: 2rem;
        @include responsive('xl-desktop'){
            flex-direction: row
        }
    }

    .section{
        @include flex(column, flex-start, unset);
        height: 100%;
    }


    .left-section{
        flex:3;
        padding: 1rem 0 0rem 1.5rem;
    }

    .middle-section,.right-section{
        flex:2;
        gap:2rem;
    }

    .add-btn:hover{
        cursor: pointer;
        color:#181818;
    }

/*LEFT PART*/
    .title-ctn{
        font-size:3rem;
        flex: 1;
    }


    .state-collab-ctn{
        flex: 5;
        @include flex(column, unset, unset);
        font-size: 1.5rem;
        gap:1rem;
        overflow-y: auto;
        &__head{
            @include flex(row, space-between, unset);
            border-bottom: 1px solid lighten($color: #252525, $amount: 15);
            padding-right: 5px;

        }

        &__main{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
            grid-template-rows: repeat(auto-fit, 150px);
            grid-gap: 1rem;
            height: 100%;
            overflow-y: auto;
        }
    }

/*MIDDLE PART*/

    .middle-section{
        .basic-ctn:first-child, .basic-ctn:nth-child(2){
            flex: 2 0 200px;
            overflow-y: auto;
        }

        .basic-ctn:last-child{
            flex:1
        }
    }

    /*Decription subpart*/
    .description{
        display: flex;
        width:100%;
        font-size: 0.9rem;
        overflow-y: auto;
    }
    .no-desc{  
        justify-content: center;
        align-items: center;
        color:#181818;
    }

    /*Tag subpart*/
    .tag-ctn{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
        width: 100%;
        font-size: 0.9rem;
        grid-gap: 1rem;

        span{
            padding: 0.5rem;
            background-color: #313131;
            height: min-content;
            box-sizing: border-box;
            @include flex(row, center, center);
        }
    }

/*RIGHT SECTION*/
    .right-section{
        .basic-ctn:first-child{
            flex:1
        }

        .basic-ctn:last-child, .basic-ctn:nth-child(2){
            flex:3
        }
    }

    /*state project subpart*/
    .btn-head-stateproject, .btn-end-project{
        padding: 0.5rem 5px;
        border: none;
        font-size: 0.8rem;
        border-radius: 3px;
        color: white;
        &:hover{
            cursor: pointer;
        }
    }

    .btn-head-stateproject{background-color: #f44a4a;}
    .btn-end-project{background-color: #121284;}

    .stateproject-ctn{
        @include flex(column, space-between, flex-start);
        width: 100%;
        gap: 0.9rem;

        &__firstline, &__lastline{
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include flex(row, space-between, center);
            width:100%;
        }
        &__firstline{font-size: 0.8rem;}

        &__lastline{
            color: #969595;font-size: 0.7rem;
        }
    }

    /*Collabs subpart*/
    .collabs-ctn{
        @include flex(column, unset, unset);
        font-size: 1.1rem;
        gap:0.2rem;
        width:100%;
    }

    /*links subpart*/
    .links-ctn{
        @include flex(column, flex-start, flex-start);
        font-size: 1.2rem;
        width:100%;
        gap:0.5rem;
    }

    .link-item{
        @include flex(row);
        width:100%;
        span:first-child{
            background-color: #4b4b4b;
            border-radius:3px 0 0 3px;
            padding: 5px 10px;
            flex:1;
        };

        span:last-child{
            border: 1px solid lighten($color: #252525, $amount: 15);
            border-radius:0 3px 3px 0;
            padding: 4px 10px;
            flex:3;
        }
    }
 
 






    
</style>