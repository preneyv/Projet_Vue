import { Router } from "express"
import { authGuard } from "../guards/auth.js"
import populate from "../utils/populate.js"
import { getAll, getAllByUserId, getOneById, insertOne, updateOne, deleteOneById } from "../controllers/project.js"

const router = Router()

//  GET /api/v1/project
router.get("/", getAll)
router.get("/user", authGuard, getAllByUserId)
router.get("/debug", populate)
router.get("/:id", getOneById)
router.delete("/:id", authGuard, deleteOneById)
router.post("/", authGuard, insertOne)
router.put("/:id", authGuard, updateOne)

export default router
