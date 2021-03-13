<template>
    <Select v-bind="field" :onChange="handleChange"/>
</template>
<script>
import Select from '@/components/system/Select.vue'
import {categories} from '../../../constants/project.js'
export default {
    name:'AddTagForm',
    components:{
        Select
    },
    data(){
        return{
            field:{
                id:'tag',
                items:categories
            },
            newValues:{
                valueTag:'',
            }
            
        }
    },
    methods:{
        handleChange(e){
            this.newValues.valueTag = e.target.value
        }
    }
}
</script>
<style lang="scss" scoped>

</style>