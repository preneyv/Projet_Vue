import { Router } from "express"
import { getAll, getOneById, insertOne, updateOne } from "../controllers/project.js"
const router = Router()

//  GET /api/v1/project
router.get("/", getAll)
router.get("/:id", getOneById)
router.post("/", insertOne)
router.put("/:id", updateOne)
router.get("/debug", (req, res) => {
    res.json("Hello")
})

export default router
