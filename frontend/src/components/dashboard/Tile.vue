<template>
    <div class="tile-ctn">
        <span>{{nameCollabPeople?.length}}/{{requiredNb}}</span>
        <span>{{getTypeCollab(type)}}</span>
    </div>
</template>

<script>
//Files Import
import {profilTypes} from '../../constants/contributor.js'

export default {
    name: 'Tile',
    props: {
        type: String,
        nameCollabPeople: Array,
        requiredNb: Number
    },
    methods: {
        /**
         * Récupère le name associé à la clef dans l'objet 'profilTypes
         */
         getTypeCollab(val) {
            return profilTypes[val].name
        },
    }
}
</script>

<style lang="scss" scoped>

    .tile-ctn {
        width: 100%;
        height: 100%;
        background-color: #202120;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 0.5rem;

        & span:first-child{
            flex: 2;
            font-size: 4.5rem;
        }

        & span:last-child {
            flex: 1;
            font-size: 1rem;
            text-align: center;
        }

        &:hover {
            cursor: pointer;
            background-color: #121284;
        }
    }

</style>