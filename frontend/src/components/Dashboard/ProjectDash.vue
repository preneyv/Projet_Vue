<template>
    <div v-if="getCurrentProject" :class="[getCurrentProject.stateProject==='En cours' ? 'open' : 'close', 'project-ctn']">
        
        <transition  name="list-notif"  mode="out-in" appear>
            <div class="notif-section" v-if="notifs !== null"><HandlingNotif  :notifs="notifs" :removeNotif="removeNotif"/></div>
        </transition>
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
                <div class="btn-requests-collabs" v-if=" (getCurrentProject.collabRequest)?.length > 0 " @click="requestPanelOpen = !requestPanelOpen"><i class="bi bi-exclamation"></i></div>
                <div class="requests-collabs" v-if="requestPanelOpen &&  (getCurrentProject.collabRequest)?.length > 0">
                    <div v-for="(req, index) in getCurrentProject.collabRequest" :key="index" class="requests-collabs__request">
                        <span>{{req.name}} veut se joindre au projet en tant que {{getTypeCollab(req.type).toLowerCase()}}.</span>
                        <div class="requests-collabs__request__response"><button @click="acceptCollabRequest(req, index)">Valider</button><button @click="refuseCollabRequest(req._id, index)">Refuser</button></div>
                    </div>
                </div>
                <template v-slot:btnHead><input class="btn-head-stateproject" type="button" :value="getCurrentProject.stateUser=== 'Admin' ? 'Supprimer le projet' : 'Se retirer du projet'"/></template>
                <div class="stateproject-ctn">
                    <div class="stateproject-ctn__firstline">
                        <span>{{getCurrentProject.stateUser === 'Admin' ? "Vous êtes administrateur sur le projet." : "Vous êtes collaborateur sur le projet"}}</span>
                        <input v-if="getCurrentProject.stateUser === 'Admin'" class="btn-end-project" type="button" :value="getCurrentProject.stateProject === 'En cours' ? 'Déclarer terminé' : 'Reprendre' " @click="switchStateProject"/>
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
import HandlingNotif from "@/components/HandlingNotif.vue"

//Files Import

import AdminAPI from '../../services/projects.js'
import {
  addTag,
  addLink,
  setDescription,
  removeOneCollab,
  acceptNewCollab,
  addNeededCollab
} from "../../utils/dashboardLogic.js";
import {categories, officialLinkTypes} from '../../constants/project.js'
import {profilTypes} from '../../constants/contributor.js'

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
        HandlingNotif
    },
    created() {
        console.log(this.project)
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
            },
            notifs:null,
            requestPanelOpen: false
        }    
    },
    props: {
        project: Object
    },
    computed: {
        /**
         * Récupère le nom, l'id et le type de collaboration.
         * Cela permet de mettre le tableau des collaborateurs dans un autre tableau
         * formaté selon ce qui suit afin qu'aucune action ne soit effectuée par le composant
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
         * Récupère le name associé à la clef dans profilTypes
         */
        getTypeCollab(val) {
            return profilTypes[val].name     
        },
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
            return officialLinkTypes.find(({value}) => val === value)?.name
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
         * Voir la méthode "addNeededCollab" dans dashboardLogic
         */
        async newCollab({valueType, valueTechnos, valueNb}) {
          return await addNeededCollab(this.getCurrentProject, valueType, valueTechnos, valueNb)
        },

        /**
         * Voir la méthode "addTag" dans dashboardLogic
         */
        async newTag({tags}) {
          return await addTag(this.getCurrentProject, tags)
        },

        /**
         * Voir la méthode "addLink" dans dashboardLogic
         */
        async newLink({valueSelect, valueInput}) {
            return await addLink(this.getCurrentProject, valueSelect, valueInput)
        },

        /**
         * Voir la méthode "setDescription" dans dashboardLogic
         */
        async changeDesc({valueInput}) {
          return await setDescription(this.getCurrentProject, valueInput)
        },

        /**
         * Voir la méthode "removeOneCollab" dans dashboardLogic
         */
        async removeCollabFromProject(id,name, type) {
          removeOneCollab(this.getCurrentProject, id, name, type).then(res => this.notifs = res)
        },

        /**
         * Voir la méthode "accepteNewCollab" dans dashboardLogic
         */
        async acceptCollabRequest(collab, index) {
          acceptNewCollab(this.getCurrentProject, collab, index).then(res => this.notifs = res)

        },
        /**
         * Refuse une demande de collaboration
         */
        async refuseCollabRequest(id, index) {
            let projectLocal = this.getCurrentProject
            let res = await AdminAPI.removeFromCollabRequest(projectLocal._id, id)
            const {modified} = res.data ?? ""
            if(modified === 1) {
                projectLocal.collabRequest.splice(index, 1)
            }else {
                this.notifs = {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
            }
        },
        /**
         * Change l'état du projet
         */
        async switchStateProject() {

            let projectLocal = this.getCurrentProject
            let valueChange = projectLocal.stateProject === "En cours" ? "Terminé" : "En cours"

            let res = await AdminAPI.setStateProject(projectLocal._id,valueChange)
            const { modified } = res?.data ?? 0
            
            if(modified === 1) {

                projectLocal.stateProject = valueChange
                this.notifs = {type: 'success', message:`Statut du projet : ${valueChange}.`}

            }else{
              this.notifs =  {type: 'error', message:`Un problème s'est produit. Réessayez plus tard.`}
            }
        
        },
        /**
         * Retire la notification du tableau de notification
         */
        removeNotif() {
            this.notifs = null
        }

    },

};
</script>
<style lang="scss" scoped>
/*MAIN CONFIG*/
    .project-ctn {
        position: relative;
        flex:4;
        border: 1px solid lighten($color: #252525, $amount: 15);
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 2rem;
        @include responsive('xl-desktop'){
            flex-direction: row
        }

        &.open {
            background-color: #252525;
        }

        &.close {
            background-color: rgba(245, 151, 151, 0.3);
        }
    }

    .section{
        @include flex(column, flex-start, unset);
        height: 100%;
    }

.section {
	@include flex(column, flex-start, unset);
	height: 100%;
}

    .left-section{
        flex: 3;
        padding: 1rem 0 0 1.5rem;
    }

    .middle-section,.right-section{
        flex: 2;
        gap: 2rem;
    }

    .add-btn:hover{
        cursor: pointer;
        color: #181818;
    }

/*LEFT PART*/
    .title-ctn{
        font-size: 3rem;
        flex: 1;
    }


    .state-collab-ctn {
        flex: 5;
        @include flex(column, unset, unset);
        font-size: 1.5rem;
        gap: 1rem;
        overflow-y: auto;

        &__head{
            @include flex(row, space-between, unset);
            border-bottom: 1px solid lighten($color: #252525, $amount: 15);
            padding-right: 5px;

        }

        &__main {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
            grid-template-rows: repeat(auto-fit, 150px);
            grid-gap: 1rem;
            height: 100%;
            overflow-y: auto;
        }
    }

/*MIDDLE PART*/

    .middle-section {
        .basic-ctn:first-child, .basic-ctn:nth-child(2) {
            flex: 2 0 200px;
            overflow-y: auto;
        }

        .basic-ctn:last-child {
            flex: 1
        }
    }

    /*Decription subpart*/
    .description {
        display: flex;
        width: 100%;
        font-size: 0.9rem;
        overflow-y: auto;
    }

    .no-desc {  
        justify-content: center;
        align-items: center;
        color: #181818;
    }

    /*Tag subpart*/
    .tag-ctn {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
        width: 100%;
        font-size: 0.9rem;
        grid-gap: 1rem;

        span {
            padding: 0.5rem;
            background-color: #313131;
            height: min-content;
            box-sizing: border-box;
            @include flex(row, center, center);
        }
    }

/*RIGHT SECTION*/
    .right-section {
        .basic-ctn:first-child {
            flex: 1
        }

        .basic-ctn:last-child, .basic-ctn:nth-child(2) {
            flex: 3
        }
    }

    /*state project subpart*/
    .btn-head-stateproject, .btn-end-project {
        padding: 0.5rem 5px;
        border: none;
        font-size: 0.8rem;
        border-radius: 3px;
        color: white;
        &:hover{
            cursor: pointer;
        }
    }

    .btn-head-stateproject {background-color: #f44a4a;}

    .btn-end-project {background-color: #121284;}

    .stateproject-ctn {
        @include flex(column, space-between, flex-start);
        width: 100%;
        gap: 0.9rem;

        &__firstline, &__lastline {
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include flex(row, space-between, center);
            width: 100%;
        }
        &__firstline {font-size: 0.8rem;}

        &__lastline {
            color: #969595;
            font-size: 0.7rem;
        }
    }

    /*Collabs subpart*/
    .collabs-ctn {
        @include flex(column, unset, unset);
        font-size: 1.1rem;
        gap: 0.2rem;
        width: 100%;
    }

    /*links subpart*/
    .links-ctn {
        @include flex(column, flex-start, flex-start);
        font-size: 1.2rem;
        width: 100%;
        gap: 0.5rem;
    }

    .link-item {
        @include flex(row);
        width: 100%;

        span:first-child {
            background-color: #4b4b4b;
            border-radius: 3px 0 0 3px;
            padding: 5px 10px;
            flex: 1;
        };

        span:last-child {
            border: 1px solid lighten($color: #252525, $amount: 15);
            border-radius:0 3px 3px 0;
            padding: 4px 10px;
            flex: 3;
        }
    }

    /**Notification panel */
    .notif-section {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 17;
    }
 
    /**Request collab panel */
    .btn-requests-collabs {
        position: absolute;
        right: -10px;
        top: -10px;
        background-color: red;
        border-radius: 50%;
        padding: 0 0.2rem;
        font-size: 1rem;
        border : 1.5px solid red;
        z-index: 15;

        &:hover {
            cursor: pointer;
        }

        &:active {
            background-color: #BF0000;
        }

    }

    .requests-collabs {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: unset;
        align-items: unset;
        background-color: #252525;
        border : 1px solid lighten($color: #252525, $amount: 15);
        padding: 0.5rem;
        width: max-content;
        top: 0;
        right: 0;
        z-index: 2;
        gap: 0.5rem;
        max-height: 800px;
        overflow-y: auto;

        &__request {
            @include flex(column, unset, unset);
            font-size: 0.9rem;
            background-color: #202120;
            border : 1px solid lighten($color: #252525, $amount: 15);
            padding: 0.5rem;

            &__response {
                @include flex(row, space-evenly, unset)

            }
        }

        button {
                    
            border: none;
            @include btn_component(0.5,5,2);
            margin: 10px auto;
            &:hover{
                cursor: pointer;
            }
        }

    }
 


/**TRANSITIONS */
.list-notif-enter-active, .list-notif-leave-active {
	transition: all .5s ease-in;
}
.list-notif-enter, .list-notif-leave-to /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateX(30px);
}

/*Collabs subpart*/
.collabs-ctn {
	@include flex(column, unset, unset);
	font-size: 1.1rem;
	gap: 0.2rem;
	width: 100%;
}

/*links subpart*/
.links-ctn {
	@include flex(column, flex-start, flex-start);
	font-size: 1.2rem;
	width: 100%;
	gap: 0.5rem;
}

.link-item {
	@include flex(row);
	width: 100%;
	span:first-child {
		background-color: #4b4b4b;
		border-radius: 3px 0 0 3px;
		padding: 5px 10px;
		flex: 1;
	}

	span:last-child {
		border: 1px solid lighten($color: #252525, $amount: 15);
		border-radius: 0 3px 3px 0;
		padding: 4px 10px;
		flex: 3;
	}
}
</style>