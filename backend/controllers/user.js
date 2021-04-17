import User from "../models/User.js"

/**
 * Get One User with a specified Id
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getOneById(req, res) {
	const { id } = req.params
	try {
		const user = await User.findOne({ _id: id }, { password: 0 })
		return res.json(user)
	} catch (e) {
		return res.json({ error: "L'utilisateur' n'existe pas" })
	}
}

export async function updateUser(req, res) {
	const { id } = req.params
	try {
		const user = await User.updateOne({ _id: id }, req.body)
		return res.json({ found: user.n, modified: user.nModified })
	} catch (e) {
		return res.json({ error: e.errmsg })
	}
}
