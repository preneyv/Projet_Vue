<template>
    <div class="project-ctn">
        <div class="section left-section">
            <div class="title-ctn"><h2>{{getCurrentProject.title}}</h2></div>
            <div class="state-collab-ctn">
                <div class="state-collab-ctn__head">
                    <span>Etat des collaborations</span>
                    <i class="bi bi-plus-square add-btn" v-if="getCurrentProject.stateUser=== 'Admin'" title="Ajouter un nouveau besoin de collaboration" @click="changeFormAndOpen(formAddCollab)"></i>
                </div>
                <div class="state-collab-ctn__main">
                    <Tile 
                    v-for="(col,index) in getCurrentProject.jobs"
                    :key="index"
                    v-bind="col"
                    />
                </div>
            </div>
        </div>
        <div class="section middle-section">
            <BasicCtn headTitle="Description">
                 <template v-slot:btnHead><i v-if="getCurrentProject.stateUser=== 'Admin'" class="bi bi-pencil-square add-btn" title="Modifier la description" @click="changeFormAndOpen(formChangeDesc)"></i></template>
                <div :class="[getCurrentProject.description ? '' : 'no-desc', 'description']" >{{getCurrentProject.description ? getCurrentProject.description : "Pas de détail"}}</div>
            </BasicCtn>
            <BasicCtn headTitle="Journal de bord">
            </BasicCtn>
            <BasicCtn headTitle="Catégories">
                <template v-slot:btnHead><i v-if="getCurrentProject.stateUser=== 'Admin'" class="bi bi-plus-square add-btn" title="Ajouter une nouvelle catégorie" @click="changeFormAndOpen(formAddTag)"></i></template>
                <div class="tag-ctn">
                    <span 
                        v-for="(tag) in getCurrentProject.tags"
                        :key="tag"
                    >{{getNameTag(tag)}}
                    </span>
                </div>
            </BasicCtn>
        </div>
        <div class="section right-section">
            <BasicCtn headTitle="Etat du projet">
                <template v-slot:btnHead><input class="btn-head-stateproject" type="button" :value="getCurrentProject.stateUser=== 'Admin' ? 'Supprimer le projet' : 'Se retirer du projet'"/></template>
                <div class="stateproject-ctn">
                    <div class="stateproject-ctn__firstline">
                        <span>{{getCurrentProject.stateUser === 'Admin' ? "Vous êtes administrateur sur le projet." : "Vous êtes collaborateur sur le projet"}}</span>
                        <input v-if="getCurrentProject.stateUser === 'Admin'" class="btn-end-project" type="button" value="Déclarer terminé"/>
                    </div>
                    <div class="stateproject-ctn__lastline">
                        <span>{{getCurrentProject.licence}}</span>
                        <span>{{getCurrentProject.stateProject}}</span>
                        <span>Créé le {{formatedDate(getCurrentProject.startedDate)}}</span>
                    </div>
                </div>
            </BasicCtn>
            <BasicCtn headTitle="Liste des collaborateurs">
                <div class="collabs-ctn">
                    <div v-for="(collab,index) in getAllCollabsNames"
                    :key="index"
                    class="collab-line">
                        <CollabsLine :collab="collab" :method="removeCollabFromProject"/>
                    </div>
                </div>
            </BasicCtn>
            <BasicCtn headTitle="Liens utiles">
                <template v-slot:btnHead><i v-if="getCurrentProject.stateUser=== 'Admin'" class="bi bi-plus-square add-btn" title="Ajouter une nouvelle catégorie" @click="changeFormAndOpen(formAddLinks)"></i></template>
                <div class="links-ctn">
                    <div class="link-item"
                        v-for="(link,index) in getCurrentProject.links"
                        :key="index"
                    >
                        <span>{{getNameLink(link.title)}}</span>
                        <span>{{link.value}}</span>
                    </div>
                </div>
            </BasicCtn>
        </div>
    <FormHandlingAdd v-if="requiredForm!==null" v-bind="requiredForm"/>
    </div>
    
</template>
<script>
//Components Import
import Tile from '@/components/Dashboard/Tile.vue'
import BasicCtn from '@/components/Dashboard/BasicCtn.vue'
import CollabsLine from '@/components/Dashboard/CollabsLine.vue'
import FormHandlingAdd from '@/components/Dashboard/BasicsForms/FormHandlingAdd.vue'
import AddTag from '@/components/Dashboard/BasicsForms/AddTag.vue'
import AddLinks from '@/components/Dashboard/BasicsForms/AddLinks.vue'
import AddCollabs from '@/components/Dashboard/BasicsForms/AddCollabs.vue'
import SetDesc from '@/components/Dashboard/BasicsForms/SetDesc.vue'

//Files Import

import AdminAPI from './AdminAPI.js'
import {categories, officialLinkTypes} from '../../constants/project.js'

//Librairies Import
import { markRaw } from 'vue'
import format from 'date-format'


export default {
    name: 'ProjectDash',
    components: {
        Tile,
        BasicCtn,
        CollabsLine,
        FormHandlingAdd,
    },
    data() {
        return {
            requiredForm: null,
            formAddCollab: {
                title: 'Besoin de nouvelles collaborations ?',
                method: this.newCollab,
                form: markRaw(AddCollabs),  
                
            },
            formAddTag: {
                
                title: 'Une nouvelle catégorie ?',
                method: this.newTag,
                form: markRaw(AddTag), 
            },
            formAddLinks: {
                title: 'Ajouter un autre lien',
                method: this.newLink,
                form: markRaw(AddLinks), 
            },
            formChangeDesc: {
                title: 'Modifier votre description de projet',
                method: this.changeDesc,
                form: markRaw(SetDesc), 
            }
        }    
    },
    props: {
        project: Object
    },
    computed: {
        /**
         * Récupère le nom, l'id et le type de collaboration.
         * Cela permet de mettre le tableau des collaborateurs dans un autre tableau
         * formaté selon ce qui suit afin qu'aucune action se soit effectuée par le composant 
         * qui a besoin des noms des collaborateurs.
         */
        getAllCollabsNames() {
            let projectLocal = this.getCurrentProject
            let tabCollabs = []
            if(projectLocal.jobs){
                projectLocal.jobs.forEach(({type, nameCollabPeople}) => {
                    nameCollabPeople.forEach(collab => {
                        let currentCollab = tabCollabs.find((obj) => obj.id===collab._collab)
                        if( currentCollab === undefined) {
                            tabCollabs.push({name:collab.name,type:[type],id:collab._collab})

                        }else {
                            if(currentCollab.type.find((el) => el === type) === undefined)
                                currentCollab.type = [...currentCollab.type,type]
                        }
                    })
                })
            }
            return tabCollabs
        },
        /**
         * Retourne le projet actuel. Cela permet de rendre la prop : this.project reactive 
         * et de constater ses changements
         */
        getCurrentProject() {
             return this.project  
        },
    },
    methods:{
        /**
         * Récupère le name associé à la clef dans le tableau  categories
         */
        getNameTag(val) {
            return categories.find(({value}) => val === value).name
        },
        /**
         * Récupère le name associé à la clef dans le tableau links
         */
        getNameLink(val) {
            return officialLinkTypes.find(({value}) => val === value).name
        },
        /**
         * Ferme le formulaire d'ajout de collab, de lien, de catégories ou de modification de la description
         */
        closeForm() {
            this.requiredForm=null
        },
        /** 
         * Change le formulaire demandé par le composant FormHandlingAdd
        */
        changeFormAndOpen(el) {
            this.requiredForm = el
        },
        /**
         * Formate les dates en utilisant la librairie 'format'
         */
        formatedDate(date) {
			return format('dd/MM/yyyy',new Date(date))
			
		},
        /**
         * Ajoute un nouveau besoin de collaboration en base de donnée.
         * Met à jour les données du projet. 
         * Passe par AdminAPI pour qu'une requête Axios soit effectuée.
         */
        newCollab({valueType, valueTechnos, valueNb}) {
            let projectLocal = this.getCurrentProject
            projectLocal.jobs.forEach((el) =>{
                if(el.type === valueType)
                    return ({message:'Cette collaboration est déjà définie dans le projet.'})      
            })

            projectLocal.jobs = [...projectLocal.jobs,{type:valueType,requiredNb:Number(valueNb),skills:valueTechnos,nameCollabPeople:[]}]
            AdminAPI.addJobRequirement(projectLocal._id,{type:valueType,requiredNb:Number(valueNb),skills:valueTechnos,nameCollabPeople:[]})
                    .then((res)=> {
                        console.log(res)
                    })
        },
        /**
         * Ajoute une nouvelle catégorie en base de donnée.
         * Met à jour les données du projet.
         * Passe par AdminAPI pour qu'une requête Axios soit effectuée.
         */
        newTag({tags}) {
            let projectLocal = this.getCurrentProject
            if(projectLocal.tags.includes(tags))
                return ({message:'Cette catégorie est déjà présente dans votre projet.'})

            projectLocal.tags = [...projectLocal.tags,tags]
            AdminAPI.addTagToProject(projectLocal._id,tags)
                    .then((res)=> {
                        console.log(res)
                    })
        },
        /**
         * Ajoute un nouveau lien en base de donnée.M
         * Met et à jour les données du projet.
         * Passe par AdminAPI pour qu'une requête Axios soit effectuée.
         */
        newLink({valueSelect, valueInput}) {
            let projectLocal = this.getCurrentProject
            projectLocal.links.forEach((el) => {
                if(el.title === valueSelect && el.value === valueInput)
                    return ({message:'Ce lien est déjà présent dans votre projet.'})      
            })

            if(!valueInput.match(/(https?|ftp|ssh|mailto):\/\/[a-z0-9/:%_+.,#?!@&=-]+/gi))
                    return ({message:"L'adresse saisie n'est pas valide."})


            projectLocal.links = [...projectLocal.links,{title:valueSelect,value:valueInput}]
            AdminAPI.addLinkToProject(projectLocal._id,{title:valueSelect,value:valueInput})
                    .then((res)=> {
                        console.log(res)
                    })
        },
        /**
         * Change la description en base de donnée. Et met à jour les données du projet.
         * Passe par AdminAPI pour qu'une requête Axios soit effectuée.
         */
        changeDesc({valueInput}) {
            let projectLocal = this.getCurrentProject

            projectLocal.description = valueInput
            AdminAPI.setDescription(projectLocal._id,valueInput)
        },
        /**
         * Retire un collaborateur du projet ou simplement une collaboration sur laquelle il est présent.
         */
        removeCollabFromProject(name, type) {
            let projectLocal = this.getCurrentProject
            if(type !== undefined) {
                let obj = projectLocal.jobs.find((el) => el.type === type)
                let person = obj.nameCollabPeople.find((p) => p.name === name)
                console.log(obj)
                console.log(obj.nameCollabPeople.indexOf(person))
                obj.nameCollabPeople.splice(obj.nameCollabPeople.indexOf(person),1)

            }else{
                projectLocal.jobs.forEach((el) => {
                    let person = el.nameCollabPeople.find((p) => p.name === name)
                    console.log(el)
                    console.log(person)
                    el.nameCollabPeople.splice(el.nameCollabPeople.indexOf(person),1)
                })
            }
            
            AdminAPI.removeCollabFromProject(projectLocal._id, name, type)
                    .then((res)=> {
                        console.log(res)
                    }).catch((err)=>{
                        console.log(err)
                    })
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