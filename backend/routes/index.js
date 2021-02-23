const express = require("express")
const router = express.Router()

//  GET /api/v1/
router.get("/", (req, res) =>
{
    res.send("Hello Project 👋")
})

module.exports = router
