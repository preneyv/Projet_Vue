<template>
    <div class="tile-ctn">
        <span>{{nameCollabPeople.length}}/{{requiredNb}}</span>
        <span>{{type}}</span>
    </div>
</template>

<script>
export default {
    name:'Tile',
    props:{
        type:String,
        nameCollabPeople:Array,
        requiredNb:Number
    },
}
</script>

<style lang="scss" scoped>

    .tile-ctn{
        width:100%;
        height: 100%;
        background-color: #202120;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & span:first-child{
            flex:2;
            font-size: 4.5rem;
        }

        & span:last-child{
            flex:1;
            font-size: 1rem;
        }

        &:hover{
            cursor: pointer;
            background-color: #121284;
        }
    }

</style>