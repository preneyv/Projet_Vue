// Node modules
import dotenv from "dotenv"
dotenv.config()
import express, { json } from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

// Imports Routes
import indexRoutes from "../routes/index.js"
import userRoutes from "../routes/user.js"
import projectRoutes from "../routes/project.js"
import authRoutes from "../routes/auth.js"

//Import DB
import db from "./DbManage.js"
const app = express()

// Connect to MongoDB
db.initDatabase()

// Port Listening
const port = process.env.PORT || 8800

//CORS config
let corsOption = {
    origin: "http://localhost:8080",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
}

// Global middlewares
app.use(helmet())
app.use(morgan("tiny"))
app.use(json())

// Routes
app.use("/api/v1/auth", cors(corsOption), authRoutes)
app.use("/api/v1/project", cors(corsOption), projectRoutes)
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
