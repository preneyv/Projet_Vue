import { Router } from "express"
import { createContactRequest, getAllContactRequests, sayHello } from "../controllers/index.js"
import { adminGuard } from "../guards/admin.js"

const router = Router()

//  GET /api/v1/
router.get("/", sayHello)
router.post("/contact", createContactRequest)
router.get("/contact", adminGuard, getAllContactRequests)

export default router
