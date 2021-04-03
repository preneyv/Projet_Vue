<template>
    <Select v-bind="select" :onChange="handleChange"/>
    <Input v-bind="input" :onInput="handleChange"/>
</template>
<script>
//Components Import
import Select from '@/components/system/Select.vue'
import Input from '@/components/system/Input.vue'

//Files Import
import {officialLinkTypes} from '../../../constants/project.js'

export default {
    name: 'AddLinksForm',
    components: {
        Select,
        Input
    },
    data() {
        return {
            select: {
                id: 'link',
                name: 'selectTypeLink',
                items: officialLinkTypes,
                required: true,
            },
            input: {
                id: 'value-link',
                name: 'valueLink',
                placeholder: 'http://site.com',
                required: true,
            },
            newValues: {
                valueSelect: '',
                valueInput: '',
            }  
        }
    },
    methods: {
        /**
         * Permet à chaque donnée de newValues d'être réactive au changement de valeur du champ associé
         */
        handleChange(e) {
            if(e.target.name==='selectTypeLink')
                this.newValues.valueSelect = e.target.value

            if(e.target.name==='valueLink')
                this.newValues.valueInput = e.target.value
        }
    }
}
</script>
