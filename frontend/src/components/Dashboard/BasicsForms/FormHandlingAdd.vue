<template>
    <div class="main-ctn">
        <div class="form-handling-add">
            <div class="form-handling-add__ctn">
                <span class="btn-exit" @click="$parent.closeForm"><i class="bi bi-x"></i></span>
                {{title}}
                <form>
                    <component v-bind:is="form" ref="child"></component>
                    <input type="submit" @click.prevent="submit" value="Valider"/>
                </form>
            </div>
            <HandlingNotif v-if="error !== null" :notifs="error" :removeNotif="removeError"/>
        </div>
    </div>
</template>
<script>
//Components Import
import HandlingNotif from '@/components/HandlingNotif.vue'

export default {
    name: "FormHandlingAdd",
    components: {
        HandlingNotif
    },
    props: {
        title: String,
        method: Function,
        form: Object
    },
    data() {
        return {
            error: null,
            valueToSend: {}
        }
    },
    methods: {
        /**
         * Permet de vérifier que le formulaire  est bien remplie et d'appeler 
         * la méthode qui permettra la persitance des modifications.
         */
        submit(){
            this.valueToSend = this.$refs.child.newValues
            this.checkValueToSendPromise().then(async ()=> {

                let backResult = await (this.method)(this.valueToSend)
                console.log(backResult)
                if (backResult) throw backResult 

            }).catch((error) => {
 
                this.error = error
            })
            
        },
        /**
         * Promesse pour vérifier que les champs ne sont pas vides
         * (Oui c'était pour le kiff de faire une promesse)
         */
        checkValueToSendPromise() {
            return new Promise((resolve,reject)=> {
                let errors=0
                for (const field in this.valueToSend) {
                    if(this.valueToSend[field]==="" || this.valueToSend[field] === undefined || (Array.isArray(this.valueToSend[field]) && this.valueToSend[field].length === 0)){
                        errors+=1
                    }
                }

                if(errors == 0) {
                    resolve("OK")
                }else{
                    reject({type:'error', message:'Veuillez remplir le formulaire correctement'})
                }
            }) 
        },
        /**
         * Supprime l'erreur du tableau d'erreur
         */
        removeError() {
			this.error = null
		},

    }
}
</script>

<style lang="scss" scoped>

    .main-ctn {
        position:absolute;
        background-color:changeOpacity($black, 0.8);;
        left:0;
        right:0;
        top:0;
        bottom:0;
        @include flex(row);
        z-index: 19;

        .form-handling-add {
            min-width: 500px;
            padding: 12px;
            background-color: #252525;
            position: relative;

            &__ctn{

                min-width: 500px;
                padding: 12px;
                background-color: #252525;
                border-radius: 5px;
                height: fit-content;
                text-align: center;
                padding-top: 2rem;
                @include flex(column,center,unset);

                form {
                    @include flex(column,center, unset);
                    gap: 1rem;
                    margin-top: 1rem;
                    text-align: left;
                }
            }
           
        }
    }

    input[type=submit] {
        border: none;
        @include btn_component(1,5,4);
        margin: 10px auto;
        &:hover{
            cursor: pointer;
        }
    }

    .btn-exit{
        background-color: white;
        font-size: 1.3rem;
        color: black;
        border-radius: 75%;
        padding: 0.1rem 0.3rem 0 0.3rem;
        position: absolute;
        top: -15px;
        left: 96%;
        &:hover{
            cursor: pointer;
        }
    }
</style>