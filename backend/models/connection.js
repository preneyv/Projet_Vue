const mongoose = require("mongoose")

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

module.exports = db
