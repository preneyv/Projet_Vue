import User from "../models/User.js"

export async function dd(req, res) {
    const user = new User({
        name: "Test",
        email: "test@gmail.com",
        password: "test",
    })
    await user.save()
    res.json({ message: "Success" })
}
