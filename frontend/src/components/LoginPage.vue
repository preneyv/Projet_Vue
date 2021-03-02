<template>
    <div class="login-ctn">
            <div class="logo"><img src="../assets/logoV.png" width="73"></div>
            <form action="" method="post" >
                <InputComponent id="email" type="email" placeholder="Ton email" name="email" required/>
                <InputComponent id="password" type="email" placeholder="Ton mot de passe" name="password" required/>
                <input type="submit"  id="submit" name="submit" value="Se connecter" />
            </form> 
    </div>
</template>

<script>
import InputComponent from '@/components/Input.vue'
export default {
    name:'LogIn',
    components:{
        InputComponent
    }
}
</script>

<style lang="scss" scoped>


.login-ctn{
   
    width:max-content;
    padding: 12px;
    background-color: #484848;
    border-radius:5px;
  
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
}

input[type=submit]{

    padding: 24px;
    border: none;
    border-radius: 3px;
    margin: 10px 0;
}



</style>