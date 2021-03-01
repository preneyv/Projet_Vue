import mongoose from "mongoose"
const { Schema, model } = mongoose

const projectSchema = new Schema({
    title: String,
    author: ObjectId,
    description: String,
    tags: [String],
    licence: String,
    contact: String,
    links: Object,
    jobs: [Object]
})

export default model("project", projectSchema)


