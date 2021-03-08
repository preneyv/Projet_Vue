<template>
    <div class="entering-ctn">
        <transition name="form-change" mode="out-in">
            <AuthTemplate key="in" v-if="isInOrUp==='in'" :tabOfInput="itemLogIn" bottomMsg="Tu n'as pas de compte ? Inscris toi !" typeOfAuth="signin" v-on:handleSwitchForm="switchForm"/>
            <AuthTemplate key="up" v-else :tabOfInput="itemLogUp" bottomMsg="Tu possèdes déjà un compte chez nous ? Connecte toi !" typeOfAuth="signup" v-on:handleSwitchForm="switchForm"/>
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
        
        align-items: center;
    }

    
    .form-change-enter-active, .form-change-leave-active{
        transition: all .3s ease-in-out;
    }

    .form-change-enter, .form-change-leave-to{
        opacity:0
    }

</style>