const User = require("../models/User")

exports.dd = async (req, res) => {
    const user = new User({
        name: "Test",
        email: "test@gmail.com",
        password: "test",
    })
    await user.save()
    res.json({ message: "Success" })
}
