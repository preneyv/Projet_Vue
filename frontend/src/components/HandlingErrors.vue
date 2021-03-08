<template>
    <transition-group tag="div" name="list-error" class="errors-ctn" mode="out-in" appear>
        <span v-for="(err, index) in errors" :key="index">{{err.message}}<i class="bi bi-x" @click="$parent.removeError(index)"></i></span>
    </transition-group>
</template>

<script>
export default {
    name:'HandlingError',
    props:{
        errors : Array
    },
}
</script>
<style lang="scss" scoped>

    .errors-ctn{
        width:100%;
        color:black;
        height:auto;
        margin-top: 0.5rem;
        @include flex(column);
        span{
            width:100%;
            padding: 0.5rem 1rem;
            background-color: #FC4646;
            border-radius:3px;
            @include flex(row,space-between);

            i{
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }

.list-error-enter-active, .list-error-leave-active {
  transition: all 5s ease-in 2s;
}
.list-error-enter, .list-error-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>