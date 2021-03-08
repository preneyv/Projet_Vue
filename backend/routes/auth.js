import { Router } from "express"
import { signin, signup } from '../controllers/auth.js'
const router = Router()


//  GET /api/v1/auth
router.post("/signin", signin)
router.post("/signup", signup)

export default router
