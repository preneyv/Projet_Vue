<template>
    <div class="login-ctn">
            <div class="logo"><img src="../assets/logoV.png" width="73"></div>
            <form action="" method="post" >
                <InputComponent 
                    v-for="item in tabOfInput" 
                    :key="item.id"
                    :id="item.id"
                    :placeholder="item.placeholder"
                    :type="item.type"
                    :name="item.name"
                    :required="item.required"
                />
                <input type="submit"  id="submit" name="submit" :value="typeOfAuth==='in' ? 'Se connecter' : `S'inscrire`" />
            </form>
            <span @click="switchForm" class="switchForm">{{bottomMsg}}</span> 
    </div>
</template>

<script>
import InputComponent from '@/components/Input.vue'
export default {
    name:'AuthTemplate',
    components:{
        InputComponent
    },
    props:{
        tabOfInput:Array,
        bottomMsg:String,
        typeOfAuth:String,
    },
    methods:{
        switchForm(){     
            this.$emit('handleSwitchForm') 
        }
    }
}
</script>

<style lang="scss" scoped>


.login-ctn{
   
    width:max-content;
    padding: 12px;
    background-color: #252525;
    border-radius:5px;
    height: fit-content;
  
}

.logo{
    width: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 55px;
}

form{
    @include flex(column);
    gap: 16px;
    margin-bottom: 15px;
}

input[type=submit]{

    padding: 24px;
    border: none;
    border-radius: 3px;
    margin: 10px 0px;
}

.switchForm{
    margin:10px auto 0 auto;
    font-size:var(--font-base);
    &:hover{
        text-decoration: underline;
        cursor: pointer;
    }
}


</style>