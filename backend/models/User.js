import mongoose from "mongoose"
import passwordHash from "password-hash"
import jwt from "jsonwebtoken"
const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        externals: [String]
    },
    { timestamps: { createdAt: "created_at" } }
)

userSchema.methods = {
    authenticate: function(password) {
        return passwordHash.verify(password, this.password);
    },

    generateAccessToken: function() {
        const tokenData = {
            name: this.name,
            email: this.email
        }

        return jwt.sign(tokenData, process.env.TOKEN_SECRET)
    }
}

export default model("user", userSchema)
