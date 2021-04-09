import { Router } from "express"
import { getOneById } from "../controllers/user.js"
const router = Router()

//  GET /api/v1/user
router.get("/:id", getOneById)

export default router
