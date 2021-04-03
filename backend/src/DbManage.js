import mongoose from "mongoose"
const db = {
	initDatabase() {
		const { DB_NAME, DB_PASSWORD, DB_USER } = process.env

		this.uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@marche-libre.nkkht.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
		this.connect()
	},
	connect() {
		mongoose
			.connect(this.uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => console.log("Connexion réussie"))
			.catch((error) => console.log(error))
	},
}

export default db
