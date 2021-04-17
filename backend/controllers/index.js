import Contact from "../models/Contact.js"

export async function sayHello(req, res) {
    return res.json({ message: "Hello Project 👋" })
}

export async function createContactRequest(req, res) {
    const { email, name, message } = req.body
	const data = {
		email,
		name,
		message
	}
	if (data.email && data.name) {
		const contact = new Contact({ email, name, message })
		await contact.save()
		return res.json({ result: "Votre message a été envoyé" })
	}
	return res.json({ error: true, result: "Une erreur est survenue" })
}

export async function getAllContactRequests(req, res) {
	const data = await Contact.find({})
	return res.json(data)
}
