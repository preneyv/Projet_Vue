const express = require("express")
const router = express.Router()

//  GET /api/v1/
router.get("/", (req, res) => {
    res.json({ message: "Hello Project 👋" })
})

module.exports = router
