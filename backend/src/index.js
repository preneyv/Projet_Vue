// Node modules
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const db = require("../models/connection")
const app = express()

// Imports Routes
const indexRoutes = require("../routes/index")

// Port Listening
const port = process.env.PORT || 8000

// Global middlewares
app.use(helmet())
app.use(morgan("tiny"))
app.use(express.json())

// Routes
app.use("/api/v1", indexRoutes)
app.all("*", (req, res, next) => {
    res.status(404).send("Bad route")
    next()
})

// Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
