import User from "../models/User.js"

/**
 * Get One User with a specified Id
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getOneById(req, res) {
	const { id } = req.params
	try {
		const user = await User.findOne({ _id: id },{password: 0})
		res.json(user)
	} catch (e) {
		res.json({ error: "L'utilisateur' n'existe pas" })
	}
}

export async function updateUser(req, res) {
	const { id } = req.params
	console.log(id)
	try {
		const user = await User.updateOne({ _id: id }, req.body)
		console.log(user)
		res.json({ found: user.n, modified: user.nModified })
	} catch (e) {
		console.log(e)
		res.json({ error: e.errmsg })
	}
}
