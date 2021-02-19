import * as db_mongo from 'mongoose'

const db = function initDatabase(){
    this.password_db = process.env.mongo_db_pwd
    this.login_db = process.env.mongo_db_user
    this.db_name = "marche_libre"
    this.uri = `mongodb+srv://${this.login_db}:${this.password_db}@marche-libre.nkkht.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
    connect(this.uri)
}

function connect(uri){
    db_mongo.connect(uri)
    .then(()=>console.log("Connexion réussie"))
    .catch(()=>console.log("Erreur à la connexion"))
}

export {db}