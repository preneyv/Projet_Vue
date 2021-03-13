<template>
    <section>
        <div class="list-ctn">
            <ItemListProject 
                v-for="pr in listOfProject"
                :key="pr.id"
                :project="pr"
                :nbSelectedProject="indexOfSelectedProject"
            />
        </div>
        <transition name="project-change" mode="out-in">
            <ProjectDash  :key="indexOfSelectedProject" :project="getCurrentProject"/>
        </transition>
    </section>
</template>

<script>
import ItemListProject from '@/components/Dashboard/ItemListProject.vue'
import ProjectDash from '@/components/Dashboard/ProjectDash.vue'

export default {
    name:"Dashboard",
    components:{
        ItemListProject,
        ProjectDash
    },
    created(){
        
        this.bus.on('handleChangeProject', (id)=>this.changeProject(id) )
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
                    stateProject:"En cours",
                    tags:[
                        { value: "development", name: "Développement" },
                        { value: "development", name: "Développement" },
                        { value: "development", name: "Développement" },
                        { value: "development", name: "Développement" },
                    ],
                    sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
                    Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
                    ea nisi.`,
                    description:`Non ea tempor sit mollit exercitation magna. Nulla ea nostrud quis exercitation labore. 
                    Esse qui dolor cillum consectetur consectetur tempor velit culpa laborum irure. Incididunt nostrud et 
                    dolore adipisicing minim veniam irure cillum mollit.Id nostrud cupidatat ex officia occaecat cillum 
                    commodo fugiat voluptate velit tempor velit adipisicing sint. Quis sit laboris aliqua laborum ullamco.
                    Incididunt fugiat exercitation duis laboris proident id non sint laboris anim pariatur voluptate reprehenderit.
                    Magna occaecat nostrud nisi esse proident ut eu et excepteur consequat consectetur deserunt eiusmod ipsum. 
                    Velit dolor laboris aute nulla cupidatat cillum commodo duis. Nostrud mollit amet duis cupidatat magna ea ea Lorem et amet 
                    officia laboris amet labore. Lorem Lorem magna tempor sunt eu. Id occaecat do voluptate excepteur excepteur labore labore veniam 
                    aute ea anim. Non sunt incididunt anim exercitation dolor cillum laborum.`,
                    links:[
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        }
                    ],
                    collabs:[
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Graphiste',
                            requiredNb:3,
                            nameCollabPeople:["Mireille D'arc","Jean Seguin"]
                        },
                        {
                            type:'Admin System',
                            requiredNb:2,
                            nameCollabPeople:["Jean Seguin"]
                        },
                        {
                            type:'Juriste',
                            requiredNb:1,
                            nameCollabPeople:[]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                    ]
                },
                {
                    id:1,
                    title:"SIte de sport",
                    stateUser:"Admin",
                    licence:"Licence 2",
                    lastUpdate:"03/01/2020",
                    startedDate:"01/01/2020",
                    stateProject:"En cours",
                    tags:['Git',"Java","Meca","Alarme","Domotique"],
                    sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
                    Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
                    ea nisi.`,
                    links:[
                        {
                            title:'Site web',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        }
                    ],
                    collabs:[
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Graphiste',
                            requiredNb:3,
                            nameCollabPeople:["Mireille D'arc","Jean Seguin"]
                        },
                        {
                            type:'Admin System',
                            requiredNb:2,
                            nameCollabPeople:["Jean Seguin"]
                        },
                        {
                            type:'Juriste',
                            requiredNb:1,
                            nameCollabPeople:[]
                        },
                    ]
                },
                {
                    id:2,
                    title:"Alarme Web Mobil",
                    stateUser:"Collab",
                    licence:"Licence 2",
                    lastUpdate:"03/01/2020",
                    startedDate:"01/01/2020",
                    tags:['Git',"Java","Meca","Alarme","Domotique"],
                    sumup:`Ipsum eiusmod reprehenderit labore dolore do Lorem qui nulla labore. 
                    Ea duis ex non culpa minim deserunt culpa in officia et sunt. Dolore cillum 
                    ea nisi.`,
                    links:[
                        {
                            title:'Site web',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        },
                        {
                            title:'GitHub',
                            value:'http://projet.github.com'
                        }
                    ],
                    collabs:[
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Developpeur',
                            requiredNb:4,
                            nameCollabPeople:["Jean Seguin","Jean Seguin","Jean Seguin","Jean Seguin"]
                        },
                        {
                            type:'Graphiste',
                            requiredNb:3,
                            nameCollabPeople:["Mireille D'arc","Jean Seguin"]
                        },
                        {
                            type:'Admin System',
                            requiredNb:2,
                            nameCollabPeople:["Jean Seguin"]
                        },
                        {
                            type:'Juriste',
                            requiredNb:1,
                            nameCollabPeople:[]
                        },
                    ]
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
            ],
            indexOfSelectedProject:0
        }
    },
    computed:{
        getCurrentProject(){
            return this.listOfProject[this.indexOfSelectedProject]
        }
    },
    methods:{
		changeProject:function(id){
            this.indexOfSelectedProject = id
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

    /*List Projects Part*/
    .list-ctn{
		flex:1;
		background-color: #252525;
		border: 1px solid lighten($color: #252525, $amount: 15);
		height: 100%;
		overflow-y: auto;
		min-width: 260px;
		max-width: 380px;
		
	}



    .project-change-enter-active, .form-change-leave-active{
        transition: all .3s ease-in-out;
    }

    .project-change-enter, .form-change-leave-to{
        transform: translateX(100%);
    }
</style>