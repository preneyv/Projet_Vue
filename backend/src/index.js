// Node modules
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const app = express()

// Connect to MongoDB
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/marchelibre?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))

// Imports Routes
const indexRoutes = require("../routes/index")
const userRoutes = require("../routes/user")

// Port Listening
const port = process.env.PORT || 8000

// Global middlewares
app.use(helmet())
app.use(morgan("tiny"))
app.use(express.json())

// Routes
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
