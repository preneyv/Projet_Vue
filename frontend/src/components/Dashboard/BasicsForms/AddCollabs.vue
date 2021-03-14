<template>
    <Select v-bind="selectType" :onChange="handleChange"/>
    <Select v-bind="selectTechno" :onChange="handleChange"/>
    <Input v-bind="inputNb" :onInput="handleChange"/>
    
</template>
<script>
import Select from '@/components/system/Select.vue'
import Input from '@/components/system/Input.vue'

import {profilTypes} from '../../../constants/contributor.js'

export default {
    name:'AddCollabsForm',
    components:{
        Select,
        Input
    },
    data(){
        return{
            
            selectType:{
                id:'collab-type',
                name:'selectType',
                required:true,
                label:"Choisir un type de collaboration",
                items: []
            },
            selectTechno:{
                id:'collab-techno',
                name:'selectTechno',
                required:true,
                multiple:true,
                label:'Choisir plusieurs technos',
                items: [],
            },
            inputNb:{
                id:'collab-nb',
                type:'number',
                name:'amount',
                label:"Nombre demandé",
                placeholder:'Combien ?',
                required:true,
                min:1,
                max:50,
            },
            newValues:{
                valueType:'',
                valueTechnos:[],
                valueNb:0,
            }
            

        }
    },
    beforeMount(){
        this.assemblingType()
    },
    watch:{
        valueType : function(newOne){
            this.turnDynamicSelectTechno(newOne)
        }
    },
    methods:{
        assemblingType(){
            let newArrayOfType = []
            profilTypes.forEach(({value, name}) =>{
                newArrayOfType.push({value,name})
            })
            this.selectType.items = newArrayOfType
        },
        turnDynamicSelectTechno(valueType){
            
            let el = []
            if(valueType !== "" && valueType !== undefined){
                el = profilTypes.find(line => line.value === valueType)
                el = el.skills 
            }
            this.selectTechno = Object.assign({}, this.selectTechno, {items:[...el]})
        },
        handleChange(e){

            if(e.target.name === 'amount')
                this.newValues.valueNb = e.target.value

            if(e.target.name === 'selectTechno')
                this.newValues.valueTechnos = e.target.value

            if(e.target.name === 'selectType'){
                this.newValues.valueType = e.target.value
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>