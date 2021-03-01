const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    projects: Array,
    manageProjects: Array
})

module.exports = model("user", userSchema)
