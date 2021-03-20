import { Router } from "express"
import { authenticateToken } from "../middlewares/auth.js"
import populate from "../utils/populate.js"
import {
    getAll,
    getAllByUserId,
    getOneById,
    insertOne,
    updateOne,
    deleteOneById,
} from "../controllers/project.js"
const router = Router()

//  GET /api/v1/project
router.get("/", getAll)
router.get("/projects/:id", getAllByUserId)
router.get("/debug", populate)
router.get("/:id", getOneById)
router.delete("/:id", authenticateToken, deleteOneById)
router.post("/", authenticateToken, insertOne)
router.put("/:id", /*authenticateToken,*/ updateOne)

export default router
