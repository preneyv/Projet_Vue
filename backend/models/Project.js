import mongoose from "mongoose"

const { Schema, model } = mongoose

const projectSchema = new Schema(
	{
		author: Schema.ObjectId,
		title: String,
		sumup: String,
		description: String,
		licence: String,
		tags: [String],
		contact: String,
		links: Object,
		jobs: [Object],
		collabRequest: [Object],
		historic: [String],
		active: { type: Boolean, default: false },
	},
	{
		timestamps: { createdAt: "startedDate", updatedAt: "lastUpdate" }
	}
)

export default model("project", projectSchema)


