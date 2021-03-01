const express = require("express")
const projectController = require("../controllers/project")
const router = express.Router()

//  GET /api/v1/project
router.get("/", projectController.getAll)
router.get("/:id", projectController.getOne)
router.post("/", projectController.insertOne)

module.exports = router
