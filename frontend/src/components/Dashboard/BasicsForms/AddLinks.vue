<template>
    <Select v-bind="select" :onChange="handleChange"/>
    <Input v-bind="input" :onInput="handleChange"/>
</template>
<script>
import Select from '@/components/system/Select.vue'
import Input from '@/components/system/Input.vue'
import {officialLinkTypes} from '../../../constants/project.js'
export default {
    name:'AddLinksForm',
    components:{
        Select,
        Input
    },
    data(){
        return{
            select:{
                id:'link',
                name:'selectTypeLink',
                items:officialLinkTypes,
                required:true,
            },
            input:{
                id:'value-link',
                name:'valueLink',
                placeholder:'',
                required:true,
            },
            newValues:{
                valueSelect:'',
                valueInput:'',
            }
            
        }
    },
    watch:{
        newValues : function(newOne){
            this.turnDynamicPlaceholder(newOne.valueSelect)
        }
    },
    methods:{
        turnDynamicPlaceholder(valueType){
            
            let el = ''
            if(valueType !== "" && valueType !== undefined){
                el = officialLinkTypes.find(line => line.value === valueType)
                el = el.example 
                
            }
            
            this.input = Object.assign({}, this.input, {placeholder:el})
        },
        handleChange(e){
            if(e.target.name==='selectTypeLink')
                this.newValues.valueSelect = e.target.selectedOptions[0].textContent

            if(e.target.name==='valueLink')
                this.newValues.valueInput = e.target.value

            
        }
    }
}
</script>
