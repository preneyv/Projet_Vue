import mongoose from "mongoose"
const { Schema, model } = mongoose

const projectSchema = new Schema({
    title: String,
    author: String,
    description: String,
    tags: Object,
    licence: String,
    contact: String,
    links: Object,
    jobs: Object
})

export default model("project", projectSchema)
