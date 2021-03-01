import { Router } from "express"
import { getAll, getOne, insertOne } from "../controllers/project.js"
const router = Router()

//  GET /api/v1/project
router.get("/", getAll)
router.get("/:id", getOne)
router.post("/", insertOne)

export default router
