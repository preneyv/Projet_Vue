import { Router } from "express"
import { signin, signup } from '../controllers/auth.js'
const router = Router()

//  GET /api/v1/auth
router.get("/signin", signin)
router.get("/signup", signup)

export default router
