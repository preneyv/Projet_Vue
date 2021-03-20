<template>
    <Select v-bind="field" :onChange="handleChange"/>
</template>
<script>
//Components Import
import Select from '@/components/system/Select.vue'
import {categories} from '../../../constants/project.js'

export default {
    name: 'AddTagForm',
    components: {
        Select
    },
    data() {
        return {
            field: {
                id: 'tag',
                items: categories
            },
            newValues: {
                tags: '',
            }
        }
    },
    methods: {
        /**
         * Permet à chaque donnée de newValues d'être réactive au changement de valeur du champ associé
         */
        handleChange(e){
            this.newValues.tags = e.target.value
        }
    }
}
</script>
<style lang="scss" scoped>

</style>