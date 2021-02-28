import mongoose from 'mongoose'
import passwordHash from "password-hash";

const userSchema = new mongoose.Schema({
    nom:String,
    email:String,
    password:String,
    date_signup:{type:Date, default:Date.now}

})

userSchema.methods = {
    authenticate: function(password) {
        return passwordHash.verify(password, this.password);
    },
}
export default mongoose.model('User', userSchema);