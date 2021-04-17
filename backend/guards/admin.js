import jwt from "jsonwebtoken"

/**
 * Verifies the user is authenticated and is a super admin
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Next} next
 * @returns
 */
export function adminGuard(req, res, next) {
	const authHeader = req.headers["authorization"]
	const token = authHeader && authHeader.split(" ")[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		console.log(user)
		if (err || !user.isSuperAdmin) return res.sendStatus(403)
		req.user = user
		next()
	})
}
