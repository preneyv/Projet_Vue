import mongoose from "mongoose"

const { Schema, model } = mongoose

const contactSchema = new Schema({
	name: String,
	email: String,
	message: String
})

export default model("contact", contactSchema)


