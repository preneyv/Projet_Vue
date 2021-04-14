<template>
    <Select v-bind="selectType" :onChange="handleChange"/>
    <Select v-bind="selectTechno" :onChange="handleChange"/>
    <Input v-bind="inputNb" :onInput="handleChange"/>
    
</template>
<script>
//Components Imports
import Select from '@/components/system/Select.vue'
import Input from '@/components/system/Input.vue'

//Files Import
import {profilTypes} from '../../../constants/contributor.js'

export default {
    name: 'AddCollabsForm',
    components: {
        Select,
        Input
    },
    data() {
        return {    
            selectType: {
                id: 'collab-type',
                name: 'selectType',
                required: true,
                label: "Choisir un type de collaboration",
                items: []
            },
            selectTechno: {
                id: 'collab-techno',
                name: 'selectTechno',
                required: true,
                multiple: true,
                label: 'Choisir plusieurs technos',
                items: [],
            },
            inputNb: {
                id: 'collab-nb',
                type: 'number',
                name: 'amount',
                label: "Nombre demandé",
                placeholder: 'Combien ?',
                required: true,
                min: 1,
                max: 50,
            },
            newValues: {
                valueType: '',
                valueTechnos: [],
                valueNb: 0,
            }
        }
    },
    beforeMount() {
        this.assemblingType()
    },
    methods: {
        /**
         * Permet de formatter le tableau des types pour que ce soit utilisable par le select
         */
        assemblingType() {
            let newArrayOfType = []
            for(const profil in profilTypes) {
                newArrayOfType.push({value:profil,name:profilTypes[profil].name})
            }
            this.selectType.items = newArrayOfType
        },
        /**
         * Permet au Select des technos d'être modifié en fonction du choix du Select des types
         */
        turnDynamicSelectTechno(valueType) {
            let el = []
            if(valueType !== "" && valueType !== undefined) {
                el = profilTypes[valueType].skills
            }
            this.selectTechno = Object.assign({}, this.selectTechno, {items:[...el]})
        },
        /**
         * Permet à chaque donnée de newValues d'être réactive au changement de valeur du champ associé
         */
        handleChange(e) {
            if(e.target.name === 'amount')
                this.newValues.valueNb = e.target.value

            if(e.target.name === 'selectTechno')
                this.newValues.valueTechnos = e.target.getValues()

            if(e.target.name === 'selectType') {
                this.newValues.valueType = e.target.value
                this.turnDynamicSelectTechno(this.newValues.valueType)
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>