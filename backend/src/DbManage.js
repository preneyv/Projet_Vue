import mongoose from 'mongoose'
import dotenv from "dotenv"


const db = {

    initDatabase : function (){
        dotenv.config()
        this.password_db = process.env.DB_PASSWORD
        this.login_db = process.env.DB_USER
        this.db_name = process.env.DB_NAME

        console.log(this.password_db, this.login_db)
        this.uri = `mongodb+srv://${this.login_db}:${this.password_db}@marche-libre.nkkht.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
        this.connect(this.uri)
    },
    connect : function (uri){
        mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
            .then(()=>console.log("Connexion réussie"))
            .catch((error)=>console.log(error))
    }


}

export default db