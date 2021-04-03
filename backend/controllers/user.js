import User from "../models/User.js"

/**
 * Debug User by creating a fake user
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function dd(req, res) {
	const user = new User({
		name: "Test",
		email: "test@gmail.com",
		password: "test",
	})
	await user.save()
	res.json({ message: "Success" })
}
