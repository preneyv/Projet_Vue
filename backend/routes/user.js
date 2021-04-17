import { Router } from "express"
import { getOneById, updateUser } from "../controllers/user.js"
import { populateUsers } from "../utils/populate.js"

const router = Router()

//  ROUTES /api/v1/user
// router.get("/populate", populateUsers)
router.get("/:id", getOneById)
router.put("/:id", updateUser)

export default router
