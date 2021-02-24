import * as db_mongo from 'mongoose'

const projectSchema = db_mongo.Schema({
    nom : String,
    date_creation : Date,
    date_debut : Date,
    dat_fin_estime : Date,
    description : String,
    categories : [String],
    required_collab : [{nb:Number, type:String}],
    collabs : [{nom_collaborateur:String, type:String}],
    equipe : [String],
    chef_equipe : ObjectId || String
})

module.exports = db_mongo.model('Project', projectSchema)



