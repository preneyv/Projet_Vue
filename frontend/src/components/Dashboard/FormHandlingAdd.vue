<template>
    <div class="main-ctn">
        <div class="form-handling-add">
            <div class="form-handling-add__ctn">
                <span class="btn-exit" @click="$parent.closeForm"><i class="bi bi-x"></i></span>
                {{title}}
                <form>
                    <Select v-for="(field,index) in tabOfField"
                        :key="index"
                        v-bind="field"
                        :onChange="handleChange"
                    />
                    
                    <input type="submit" @click="method" value="Valider"/>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Select from '@/components/system/Select.vue'
export default {
    name:"FormHandlingAdd",
    components: { 
        Select
    },
    props:{
        title:String,
        tabOfField:Array,
        method:Function,
        value:String
    },
    data(){
        return{
            valueOfSelect : this.value
        }
    },
    methods:{
        handleChange : function(e){
            this.valueOfSelect = e.target.value
        }
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
                    @include flex(row);
                    gap:1rem;
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