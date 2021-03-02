import mongoose from "mongoose"
const { Schema, model } = mongoose

const projectSchema = new Schema({
    title: String,
    author: ObjectId,
    description: String,
    tags: Object,
    licence: String,
    contact: String,
    links: Object,
    jobs: Array
})

export default model("project", projectSchema)


