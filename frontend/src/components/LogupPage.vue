<template>
    <div class="logup-ctn">
        <div class="signup-form">
            <div class="subscribe-header">
                <div class="register-one"><h3>Register</h3><h6>Join us now !</h6></div>
            </div>
            <form  action="" method="post" >
                <div class="item-input">
                    <input type="text" placeholder="Ton nom" id="name" name="nameInputLogUp" />
                </div>
                <div class="item-input">
                    <input type="email" placeholder="Ton email" id="email" name="emailInputLogUp" />
                </div>
                <div class="item-input">
                    <input type="password" placeholder="Mot de passe" id="password" name="passInputLogUp" />
                </div>
                <div class="item-input">
                    <input type="submit"  id="submit" name="submitInputLogUp" value="S'inscrire" />
                </div>
            </form>
        </div>
        <div style="color: white;">
            Vous avez déjà un compte ? <a href="" style="text-decoration: underline; color: white;">Connectez-vous !</a>
        </div>
    </div>
</template>

<script>
export default {
    name : 'LogUp',
}
</script>

<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600&display=swap');
.logup-ctn{
   
    width:20%;
    min-width:100px;
    max-width:300px;
    display: flex;
    flex-direction: column;
  
}

</style>