import { Router } from "express"
import populate from '../utils/populate.js'
import { getAll, getOneById, insertOne, updateOne, deleteOneById } from "../controllers/project.js"
const router = Router()

//  GET /api/v1/project
router.get("/", getAll)
router.get("/debug", populate)
router.get("/:id", getOneById)
router.delete("/:id", deleteOneById)
router.post("/", insertOne)
router.put("/:id", updateOne)

export default router
