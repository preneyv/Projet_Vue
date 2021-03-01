import { Router } from "express"
import { dd } from "../controllers/user.js"
const router = Router()

//  GET /api/v1/user
router.get("/", dd)

export default router
