<template>
    <div class="project-ctn">
        <div class="section left-section">
            <div class="title-ctn"><h2>{{project.title}}</h2></div>
            <div class="state-collab-ctn">
                <div class="state-collab-ctn__head">
                    <span>Etat des collaborations</span>
                    <i class="bi bi-plus-square" title="Ajouter un nouveau besoin de collaboration"></i>
                </div>
                <div class="state-collab-ctn__main">
                    <Tile 
                    v-for="(col,index) in project.collabs"
                    :key="index"
                    v-bind="col"
                    />
                </div>
            </div>
        </div>
        <div class="section middle-section">
        </div>
        <div class="section right-section">
        </div>
    </div>
</template>
<script>
import Tile from '@/components/Dashboard/Tile.vue'
export default {
    name:'ProjectDash',
    components:{
        Tile
    },
    props:{
        project:Object
    },


}
</script>
<style lang="scss" scoped>

    .project-ctn{
        flex:4;
        background-color: #252525;
        border: 1px solid lighten($color: #252525, $amount: 15);
        height:100%;
        display:flex;
        padding:1rem;
    }

    .section{
        display:flex;
        flex-direction: column;
        height: 100%;
    }

    .left-section{
        flex:1.5;
        padding: 1rem 0 1rem 1.5rem;
    }

    .middle-section,.right-section{
        flex:auto;
    }

    .title-ctn{
        font-size:3rem;
        flex: 1;
    }

    .state-collab-ctn{
        display: flex;
        flex: 5;
        flex-direction: column;
        font-size: 1.5rem;
        gap:1rem;
        &__head{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid lighten($color: #252525, $amount: 15);
            padding-right: 5px;

            i:hover{
                cursor: pointer;
                color:#181818;
            }
        }

        &__main{
            display: grid;
            grid-template-columns: repeat(auto-fit,minmax(20%,1fr) );
            grid-template-rows: repeat(auto-fit, 150px);
            grid-gap: 1rem;
            height: 100%;
        }
    }

    
</style>