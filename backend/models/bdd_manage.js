import mongoose from 'mongoose'

const db = {

    initDatabase : function (){

        this.password_db = "valere"
        this.login_db = "valere-admin"

        this.db_name = "marche_libre"
        this.uri = `mongodb+srv://${this.login_db}:${this.password_db}@marche-libre.nkkht.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
        this.connect(this.uri)
    },
    connect : function (uri){
        mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=>console.log("Connexion réussie"))
            .catch((error)=>console.log(error))
    }


}


export {db}