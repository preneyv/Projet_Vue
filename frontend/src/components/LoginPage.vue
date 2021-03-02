<template>
    <div class="login-ctn">
        <div class="top-ctn">
            <div class="subscribeHeader">
                <div class="registerOne"><h3>Come In</h3><h6>Glad to see you again !</h6></div>
                <div><i class="fas fa-arrow-right fa-3x"></i></div>
            </div>
            <form action="" method="post" >
                <div class="item-input">
                    <input type="email" placeholder="Ton email" id="email" name="email" />
                </div>
                <div class="item-input">
                    <input type="password" placeholder="Mot de passe" id="pass" name="pass" />
                </div>
                <div class="item-input">
                    <input type="submit"  id="submit" name="submit" value="Se connecter" />
                </div>
            </form> 
        </div>
        <div style="color: white;">
            Vous n'avez pas de compte ? <a href="" style="text-decoration: underline; color: white;">Créez en un !</a>
        </div>
    </div>
    
</template>

<script>

export default {
    name:'LogIn',
}
</script>

<style scoped>


.login-ctn{
   
    width:20%;
    min-width:100px;
    max-width:300px;
    display: flex;
    flex-direction: column;
    background : #5DADE2;
    padding: 12px;
  
}
.top-ctn{
    margin-bottom: 20px;
}

form{
    display: flex;
    flex-direction: column;
    gap: 9px;

}

.item-input > input, .item-input{
    height:100%;
    width : 100%;
    box-sizing: border-box;
}

.item-input input{
    background-color: white;
    border:none;
    font-family: 'Barlow Semi Condensed', sans-serif;
    padding : 13px;
}
</style>