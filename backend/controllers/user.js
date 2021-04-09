import User from "../models/User.js"

/**
 * Get One User with a specified Id
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getOneById(req, res) {
	const { id } = req.params
	try {
		const project = await User.findOne({ _id: id },{password: 0})
		res.json(project)
	} catch (e) {
		res.json({ error: "L'utilisateur' n'existe pas" })
	}
}
