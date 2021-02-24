import * as db_mongo from 'mongoose'

const userSchema = new db_mongo.Schema({
    nom:String,
    email:String,
    password:String,
    date_signin:Date,

})

module.exports = db_mongo.model('User', userSchema)