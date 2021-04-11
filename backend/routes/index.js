import { Router } from "express"
import Contact from "../models/Contact.js"
const router = Router()

//  GET /api/v1/
router.get("/", (req, res) => {
	res.json({ message: "Hello Project 👋" })
})
router.post("/contact", async (req, res) => {
	const { email, name, message } = req.body
	const data = {
		email,
		name,
		message,
	}
	if (data?.email && data?.name) {
		const contact = new Contact({ email, name, message })
		const result = await contact.save()
		return res.json({ result: "Votre message a été envoyé" })
	}
	return res.json({ error: true, result: "Une erreur est survenue" })
})

export default router
