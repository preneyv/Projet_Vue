<template>
        <div class="basic-ctn">
            <div class="basic-ctn__head">
                <span>{{headTitle}}</span>
                <slot name="btnHead"></slot>
            </div>
            <div class="basic-ctn__main">
                <slot ></slot>
            </div>
            
        </div>
</template>

<script>
export default {
    name:"BasicCtn",
    props:{
        headTitle:String,
    },
}
</script>

<style lang="scss" scoped>

.basic-ctn{

        display: flex;
        flex-direction: column;
        font-size: 1.5rem;
        gap: 0.5rem;
        background-color: #202120;
        border : 1px solid lighten($color: #252525, $amount: 15);
        padding:1rem 1rem 0.5rem 1rem;
        border-radius: 3px;
        &__head{
            border-bottom: 1px solid lighten($color: #252525, $amount: 15);
            flex:1;
            display:flex;
            justify-content: space-between;
            font-size: 1.3rem;
            padding: 5px 0;

        }
        &__main{
            display: flex;
            flex:6;   
        }
        
    }


</style>