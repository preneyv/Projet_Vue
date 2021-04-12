import mongoose from "mongoose"

const { Schema, model } = mongoose

const contactSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	message: String,
	date: {type: Date, default: Date.now}
})

export default model("contact", contactSchema)
