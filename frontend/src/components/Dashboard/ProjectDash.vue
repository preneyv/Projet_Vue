<template>
    <div class="project-ctn">
        <div class="section left-section">
            <div class="title-ctn"><h2>{{project.title}}</h2></div>
            <div class="state-collab-ctn">
                <div class="state-collab-ctn__head">
                    <span>Etat des collaborations</span>
                    <i class="bi bi-plus-square add-btn" title="Ajouter un nouveau besoin de collaboration" @click="changeFormAndOpen(formAddCollab)"></i>
                </div>
                <div class="state-collab-ctn__main">
                    <Tile 
                    v-for="(col,index) in project.collabs"
                    :key="index"
                    v-bind="col"
                    />
                </div>
            </div>
        </div>
        <div class="section middle-section">
            <BasicCtn headTitle="Description">
                <div :class="[project.description ? '' : 'no-desc', 'description']" >{{project.description ? project.description : "Pas de détail"}}</div>
            </BasicCtn>
            <BasicCtn headTitle="Journal de bord">
            </BasicCtn>
            <BasicCtn headTitle="Catégories">
                <template v-slot:btnHead><i class="bi bi-plus-square add-btn" title="Ajouter une nouvelle catégorie" @click="changeFormAndOpen(formAddTag)"></i></template>
                <div class="tag-ctn">
                    <span 
                        v-for="(tag) in project.tags"
                        :key="tag.value"
                    >{{tag.name}}
                    </span>
                </div>
            </BasicCtn>
        </div>
        <div class="section right-section">
            <BasicCtn headTitle="Etat du projet">
                <template v-slot:btnHead><input class="btn-head-stateproject" type="button" :value="project.stateUser=== 'Admin' ? 'Supprimer le projet' : 'Se retirer du projet'"/></template>
                <div class="stateproject-ctn">
                    <div class="stateproject-ctn__firstline">
                        <span>{{project.stateUser=== 'Admin' ? "Vous êtes administrateur sur le projet." : "Vous êtes collaborateur sur le projet"}}</span>
                        <input v-if="project.stateUser=== 'Admin'" class="btn-end-project" type="button" value="Déclarer terminé"/>
                    </div>
                    <div class="stateproject-ctn__lastline">
                        <span>{{project.licence}}</span>
                        <span>{{project.stateProject}}</span>
                        <span>Créé le {{project.startedDate}}</span>
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
                <template v-slot:btnHead><i class="bi bi-plus-square add-btn" title="Ajouter une nouvelle catégorie"></i></template>
                <div class="links-ctn">
                    <div class="link-item"
                        v-for="(link,index) in project.links"
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
import FormHandlingAdd from '@/components/Dashboard/FormHandlingAdd.vue'
import {categories} from '../../constants/project.js'
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
            requiredForm:null,
            formAddCollab:{
                title:'Besoin de nouvelles collaborations ?',
                input:[{type:'text',prefix:'Titre'},{type:'number',prefix:'Nombre demandé',min:0,max:50}],
                method:this.newCollab()
            },
            formAddTag:{
                title:'Une nouvelle catégorie ?',
                tabOfField:[{id:'tag',items:categories}],
                valueSelect:'',
                method:this.newTag()
            }
        }    
    },
    props:{
        project:Object
    },
    computed:{
        getAllCollabsNames : function(){
            let tabCollabs = []
            if(this.project.collabs){
                this.project.collabs.forEach(({type, nameCollabPeople}) => {
                    nameCollabPeople.forEach(name => {
                        if(tabCollabs.find((obj) => obj.name===name) === undefined)
                            tabCollabs.push({name:name,type:type})
                        
                    })
                })
            }
            return tabCollabs
        },

        getStateUser : function(){
            return this.project.stateUser === "Admin" ? "Admin" : "Collab"
        },
    },
    methods:{
        closeForm : function(){
            this.requiredForm=null
        },
        changeFormAndOpen:function(form){
            this.requiredForm = form
        },
        newCollab : function(){},
        newTag : function(){},
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
        padding:1rem;
        gap: 2rem;
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
        grid-template-columns: repeat(auto-fit, minmax(80px,1fr));
        width: 100%;
        font-size: 0.9rem;
        grid-auto-rows: min-content;
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