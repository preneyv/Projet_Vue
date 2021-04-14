import mongoose from "mongoose"
import passwordHash from "password-hash"
import jwt from "jsonwebtoken"

const { Schema, model } = mongoose

const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		externals: [Object],
		isSuperAdmin: Boolean
	},
	{
		timestamps: { createdAt: "created_at" }
	}
)

userSchema.methods = {
	/**
	 * Verify the password matches with the hash
	 * @param {string} password
	 * @returns
	 */
	authenticate: function (password) {
		return passwordHash.verify(password, this.password)
	},

	/**
	 * Create the JWT for this user
	 * @returns {string}
	 */
	generateAccessToken: function () {
		const payload = {
			_id: this._id,
			name: this.name,
			email: this.email,
			isSuperAdmin: this.isSuperAdmin
		}

		return jwt.sign(payload, process.env.TOKEN_SECRET)
	},
}

export default model("user", userSchema)
