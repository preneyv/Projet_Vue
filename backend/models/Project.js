const mongoose = require("mongoose")
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

module.exports = model("project", projectSchema)
