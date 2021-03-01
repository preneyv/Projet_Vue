import { Router } from "express"
const router = Router()

//  GET /api/v1/
router.get("/", (req, res) => {
    res.json({ message: "Hello Project 👋" })
})

export default router
