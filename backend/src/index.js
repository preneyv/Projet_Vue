// Node modules
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoose = require("mongoose")
const app = express()

// Imports Routes
const indexRoutes = require("../routes/index")

// Port Listening
const port = process.env.PORT || 8000

// Connect to MongoDB
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URI}/marche_libre?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))

// Global middlewares
app.use(helmet())
app.use(morgan("tiny"))
app.use(express.json())

// Routes
app.use("/api/v1", indexRoutes)

app.all("*/**/", (res, req) => {
    res.statusCode(404).send("Bad route")
})

// Start Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
