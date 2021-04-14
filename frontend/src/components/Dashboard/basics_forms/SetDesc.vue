<template>
    <Textarea v-bind="input" :onInput="handleChange"/>
</template>
<script>
//Components Import
import Textarea from '@/components/system/Textarea.vue'

export default {
    name: "SetDesc",
    components: {
        Textarea,
    },
    data() {
        return {
            textarea: {
                id: 'value-desc',
                name: 'valueDesc',
                placeholder: 'http://site.com',
                required: true,
            },
            newValues: {
                valueInput: '',
            }
        }
    },
    methods: {
        /**
         * Permet à chaque donnée de newValues d'être réactive au changement de valeur du champ associé
         */
        handleChange(e) {
            this.newValues.valueInput = e.target.value
        }
    }
}

</script>