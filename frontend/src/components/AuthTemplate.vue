<template>
    <div class="main-ctn">
        <div class="log-ctn">
                <div class="logo"><img src="../assets/logoV.png" width="73"></div>
                <form>
                    <InputComponent 
                        v-for="item in tabOfInput" 
                        :key="item.id"
                        :id="item.id"
                        :placeholder="item.placeholder"
                        :type="item.type"
                        :name="item.name"
                        :required="item.required"
                    />
                    <input type="submit"  id="submit" name="submit"  @click="submitForm" :value="typeOfAuth==='signin' ? 'Se connecter' : `S'inscrire`" />
                </form>
                <span @click="switchForm" class="switchForm">{{bottomMsg}}</span>  
        </div>
        <HandlingErrors :errors="tabOfErrors" v-if="tabOfErrors.length >0"/>
    </div>
</template>

<script>
import InputComponent from '@/components/Input.vue'
import HandlingErrors from '@/components/HandlingErrors.vue'
import Axios from 'axios'

export default {
    name:'AuthTemplate',
    inheritAttrs: false,
    components:{
        InputComponent,
        HandlingErrors
    },
    data(){
        return{
            tabOfValue:{},
            tabOfErrors:[]
        }
    },
    props:{
        tabOfInput:Array,
        bottomMsg:String,
        typeOfAuth:String,
    },
    methods:{
        switchForm(){     
            this.$emit('handleSwitchForm') 
        },
        submitForm(e){
            e.preventDefault()
            let vm=this
            Axios.post(this.getActionURI,this.tabOfValue)
            .then(function(res) {

                console.log(res)
            }).catch(function(error){

                let back = error.response.data
                vm.tabOfErrors = back
            })
            
        },
        insertIntoDataStore({id, value}){
            this.tabOfValue[id] = value
        },
        removeError(i){
             this.tabOfErrors.splice(i,1)
        }
    },
    computed:{
        getActionURI : function() {
            return `http://localhost:8800/api/v1/auth/${this.typeOfAuth}`
        }
    }
}
</script>

<style lang="scss" scoped>


.main-ctn{
    width:max-content;
    height: fit-content;
}
.log-ctn{
   
    width:auto;
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

    
    border: none;
    @include btn_component(1,5,4);
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