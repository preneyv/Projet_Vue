// Node modules
import dotenv from "dotenv"
dotenv.config()
import express, { json } from "express"
import morgan from "morgan"
import helmet from "helmet"
import mongoose from "mongoose"

// Imports Routes
import indexRoutes from "../routes/index.js"
import userRoutes from "../routes/user.js"
import projectRoutes from "../routes/project.js"

//Import BDD
import db from './DbManage.js'
const app = express()

// Connect to MongoDB
db.initDatabase()


// Port Listening
const port = process.env.PORT || 8000

// Global middlewares
app.use(helmet())
app.use(morgan("tiny"))
app.use(json())

// Routes
app.use("/api/v1/project", projectRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1", indexRoutes)
app.all("*", (req, res, next) => {
    res.status(404).json({ message: "Wrong route" })
    next()
})

// Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
