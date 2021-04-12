import mongoose from "mongoose"

const { Schema, model } = mongoose

const contactSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	message: String,
},
{ timestamps: { createdAt: "date_message" } }
)

export default model("contact", contactSchema)
