import User from "../models/User.js"
import passwordHash from "password-hash"

/**
 * Login user from the db and generate a JWT
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns
 */
export async function signin(req, res) {
	const { email, password } = req.body

	if (!email || !password) {
		return res
			.status(403)
			.json({ message: `Formulaire invalide` })
	}

	const user = await User.findOne({ email })
	if (!user || !passwordHash.verify(password, user.password)) {
		return res
			.status(403)
			.json({ message: `Email ou mot de passe invalide` })
	}

	const token = user.generateAccessToken()
	return res.json({ token })
}

/**
 * Create a user and insert it into the database
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @returns 
 */
export async function signup(req, res) {
	const { name, email, password, externals } = req.body

	if (!name || !email || !password) {
		return res
			.status(403)
			.json([{ message: `Formulaire invalide` }])
	}

	const isEmailTaken = (await User.find({ email })).length !== 0

	if (isEmailTaken) {
		return res
			.status(403)
			.json([{ message: `Email déjà associé à un compte` }])
	}

	try {
		const user = new User({
			name,
			email,
			password: passwordHash.generate(password),
			externals,
		})

		user.save((error) => {
			if (error) throw new Error(error)

			const token = user.generateAccessToken()
			return res.status(200).json({ token })
		})
	} catch (error) {
		return res.status(500).json({ message: `${error}` })
	}
}
