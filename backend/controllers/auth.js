import User from '../models/User.js'
import passwordHash from "password-hash"

export async function signin(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user?.authenticate(password)) {
            return res
            .status(403)
            .json({ message: `Email ou mot de passe invalide` })
        }

        const token = user.generateAccessToken()
        return res.json({ token })
    } catch (e) {
        return res
        .status(500)
        .json({ message: `Error: ${e}` })
    }
}

export async function signup(req, res) {
    const { name, email, password, externals } = req.body

    if (!name || !email || !password) {
        return res.sendStatus(400)
    }

    const isEmailTaken = (await User.find({ email })).length !== 0

    if (isEmailTaken) {
        return res
        .status(403)
        .json({ message: `Email déjà associé à un compte` })
    }

    try {
        const user = new User({
            name,
            email,
            password: passwordHash.generate(password),
            externals
        })

        user.save((err) => {
            if (err) throw new Error(err)

            const token = user.generateAccessToken()
            return res.json({ token })
        })
    } catch (e) {
        return res
        .status(500)
        .json({ message: `Error: ${e}` })
    }
}