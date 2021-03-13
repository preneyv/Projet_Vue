<template>
            <span class="name-person" @click="isOptionOpened = !isOptionOpened">{{collabName.name}}</span>
            <transition name="growup-div">
                <div v-if="isOptionOpened===true" class="option-panel">
                    <span><i class="bi bi-gear"></i>{{collabName.type}}</span>
                    <span v-if="$parent.$parent.getStateUser === 'Admin'" class="remove-from-project"><i class="bi bi-box-arrow-right"></i>Retirer du projet</span>
                </div>
            </transition>

</template>

<script>
export default {
    name:"CollabLine",
    data(){
        return{
            isOptionOpened : false
        }
    },
    props:{
        collabName:Object,
    },
    updated(){
        console.log(this.isOptionOpened)
    }
    
}
</script>
<style lang="scss" scoped>

    

    .name-person{
        font-size: 1rem;
        &:hover{
            cursor: pointer;
        }
    }
    .option-panel{
        font-size: 0.8rem;
        @include flex(row, space-between, unset);
        color: #969595;
        border-bottom: 1px solid lighten($color: #252525, $amount: 15);
        padding-top: 5px;
        width: 90%;
        float: right;

        span{
            display: flex;
            gap:0.2rem;
        }
    }

    .remove-from-project{
        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }

/*Transition*/
    .growup-div-enter-active, .growup-div-leave-active{
        transition : opacity .5s ease;
    }

    .growup-div-enter, .growup-div-leave-to{
        opacity:0;
    }
    


</style>