import { Router } from "express"
import { getOneById, updateUser } from "../controllers/user.js"
import { populateUsers } from "../utils/populate.js"

const router = Router()

//  GET /api/v1/user
router.get("/populate", populateUsers)
router.get("/:id", getOneById)
router.put("/:id", updateUser)

export default router
