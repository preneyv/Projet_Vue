import mongoose from "mongoose"
import passwordHash from "password-hash"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

const { Schema, model } = mongoose

const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		externals: [String],
	},
	{ timestamps: { createdAt: "created_at" } }
)

userSchema.methods = {
	/**
	 * Verify the password with the hash
	 * @param {string} password
	 * @returns
	 */
	authenticate: function (password) {
		return passwordHash.verify(password, this.password)
	},

	/**
	 * Create the JWT
	 * @returns {string}
	 */
	generateAccessToken: function () {
		// dotenv.config()
		const payload = {
			_id: this._id,
			name: this.name,
			email: this.email,
		}

		return jwt.sign(payload, process.env.TOKEN_SECRET)
	},
}

export default model("user", userSchema)
