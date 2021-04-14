import mongoose from "mongoose"

const { Schema, model } = mongoose

const projectSchema = new Schema({
	title: String,
	author: Schema.ObjectId,
	description: String,
	sumup: String,
	active: { type: Boolean, default: false },
	tags: [String],
	licence: String,
	contact: String,
	links: Object,
	jobs: [Object],
	collabRequest: [Object],
	historic: [String]
},
{ timestamps: { createdAt: "startedDate", updatedAt: "lastUpdate" } }
)

export default model("project", projectSchema)


