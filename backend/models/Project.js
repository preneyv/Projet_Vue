import mongoose from "mongoose"

const { Schema, model } = mongoose

const projectSchema = new Schema({
	title: String,
	author: Schema.ObjectId,
	description: String,
	sumup: String,
	stateProject: String,
	startedDate: Date,
	lastUpdate: Date,
	tags: [String],
	licence: String,
	contact: String,
	links: Object,
	jobs: [Object],
	collabRequest: [Object],
	historic: [String]
})

export default model("project", projectSchema)


