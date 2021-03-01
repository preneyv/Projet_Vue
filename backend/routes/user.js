const express = require("express")
const userController = require("../controllers/user")
const router = express.Router()

//  GET /api/v1/user
router.get("/", userController.dd)

module.exports = router
