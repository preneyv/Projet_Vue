<template>
    <div class="main-ctn">
        <div class="form-handling-add">
            <div class="form-handling-add__ctn">
                <span class="btn-exit" @click="$parent.closeForm"><i class="bi bi-x"></i></span>
                {{title}}
                <form>
                    <component v-bind:is="form" ref="child"></component>
                    <input type="submit" @click.prevent="submit" value="Valider"/>
                </form>
            </div>
            <HandlingError v-if="errors.length > 0" :errors="errors" :removeError="removeError"/>
        </div>
    </div>
</template>
<script>

import HandlingError from '@/components/HandlingErrors.vue'
export default {
    name:"FormHandlingAdd",
    components:{
        HandlingError
    },
    props:{
        title:String,
        method:Function,
        form:Object
    },
    data(){
        return{
            errors: [],
            valueToSend:{}
        }
    },

    methods:{
        submit : function(){
            this.valueToSend = this.$refs.child.newValues
        },

//Errors Displaying functions
        removeError(i) {
			this.errors.splice(i, 1)
		},

    }
}
</script>

<style lang="scss" scoped>

    .main-ctn{
        position:absolute;
        background-color:changeOpacity($black, 0.8);;
        left:0;
        right:0;
        top:0;
        bottom:0;
        @include flex(row);
        .form-handling-add{
            min-width: 500px;
            padding: 12px;
            background-color: #252525;
            position: relative;
            &__ctn{

                min-width: 500px;
                padding: 12px;
                background-color: #252525;
                border-radius:5px;
                height: fit-content;
                text-align: center;
                padding-top:2rem;
                @include flex(column,center,unset);

                form{
                    @include flex(column,center, unset);
                    gap:1rem;
                    margin-top: 1rem;
                    text-align: left;
                }
            }
           
        }
    }

    input[type=submit] {
        border: none;
        @include btn_component(1,5,4);
        margin: 10px auto;
        &:hover{
            cursor: pointer;
        }
    }

    .btn-exit{
        background-color: white;
        font-size: 1.7rem;
        color: black;
        border-radius: 75%;
        padding: 0rem 0.3rem;
        position: absolute;
        top: -20px;
        left: 96%;
        &:hover{
            cursor: pointer;
        }
    }
</style>