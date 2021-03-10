<template>
    <div class="entering-ctn">
        <transition name="form-change" mode="out-in">
            <AuthTemplate key="in" v-if="isInOrUp==='in'" :tabOfInput="itemLogIn" bottomMsg="Pas de compte ? Rejoignez nous !" typeOfAuth="signin" v-on:handleSwitchForm="switchForm"/>
            <AuthTemplate key="up" v-else :tabOfInput="itemLogUp" bottomMsg="Déjà inscrit ? Connectez-vous ici !" typeOfAuth="signup" v-on:handleSwitchForm="switchForm"/>
        </transition>
    </div>
</template>


<script>
import AuthTemplate from '@/components/AuthTemplate'


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
                        prefix:'Email',
                        placeholder:"Saisir un email",
                        required:true
                    },
                    {
                        id:"password",
                        name:"password",
                        type:"password",
                        prefix:'Mot de passe',
                        placeholder:"Saisir un mot de passe",
                        required:true,
                    }
            ],
            itemLogUp : [
                    {
                        id:"name",
                        name:"name",
                        prefix:'Nom',
                        placeholder:"Saisir un  nom",
                        required:true
                    },
                    {
                        id:"email",
                        name:"email",
                        type:"email",
                        prefix:'Email',
                        placeholder:"Saisir un email",
                        required:true
                    },
                    {
                        id:"password",
                        name:"password",
                        type:'password',
                        prefix:'Mot de passe',
                        placeholder:"Saisir un mot de passe",
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

    .entering-ctn{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    
    .form-change-enter-active, .form-change-leave-active{
        transition: all .3s ease-in-out;
    }

    .form-change-enter, .form-change-leave-to{
        opacity:0
    }

</style>