import mongoose from "mongoose"
const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        extarnals: [String]
    },
    { timestamps: { createdAt: "created_at" } }
)

export default model("user", userSchema)
