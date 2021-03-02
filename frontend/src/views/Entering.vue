<template>
    <div class="entering-ctn">
            <LogIn />
            <!--<LogUp />-->
    </div>
</template>


<script>
import LogIn from '@/components/LoginPage'
//import LogUp from '@/components/LogupPage'

export default {
    name: 'Entering',
    components:{
        LogIn,
        
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
    }

</style>