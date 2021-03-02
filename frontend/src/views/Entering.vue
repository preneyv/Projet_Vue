<template>
    <div class="entering-ctn">
        <transition name="form-change">
            <AuthTemplate v-if="isInOrUp==='in'" :tabOfInput="itemLogIn" bottomMsg="Tu n'as pas de compte ? Inscris toi !" typeOfAuth="in" v-on:handleSwitchForm="switchForm"/>
            <AuthTemplate v-else :tabOfInput="itemLogUp" bottomMsg="Tu possède déjà un compte chez nous ? Connecte toi !" typeOfAuth="up" v-on:handleSwitchForm="switchForm"/>
        </transition>
    </div>
</template>


<script>
import AuthTemplate from '@/components/AuthTemplate'
//import LogUp from '@/components/LogupPage'

export default {
    name: 'Entering',
    components:{
        AuthTemplate,
    },
    data(){
        return{
            isInOrUp : 'in',
            itemLogIn : [
                    {
                        id:"email",
                        name:"email",
                        type:'email',
                        placeholder:"Ton email",
                        required:true
                    },
                    {
                        id:"password",
                        name:"password",
                        type:"password",
                        placeholder:"Ton mot de passe",
                        required:true,
                    }
            ],
            itemLogUp : [
                    {
                        id:"name",
                        name:"name",
                        placeholder:"Ton nom",
                        required:true
                    },
                    {
                        id:"email",
                        name:"email",
                        type:"email",
                        placeholder:"Ton email",
                        required:true
                    },
                    {
                        id:"password",
                        name:"password",
                        type:'password',
                        placeholder:"Ton mot de passe",
                        required:true,
                    }
            ]
        }
    },
    methods:{

        switchForm : function(){
            this.isInOrUp = this.isInOrUp==="in" ? "up" : "in"
        }
            
    }
    
}
</script>

<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600&display=swap');

    .entering-ctn{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        font-family: 'Barlow Semi Condensed', sans-serif;
        align-items: center;
    }

    .form-change-enter-active, .form-change-leave-active{
        transition: opacity .3s ease;
    }

    .form-change-enter, .form-change-leave-to{
        opacity:0
    }

</style>