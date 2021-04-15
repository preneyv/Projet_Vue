import faker from "faker"
import Project from "../models/Project.js"
import User from "../models/User.js"
import passwordHash from "password-hash"
import Types from "mongoose"

const licenses = [
	{ value: "CC-ZERO", name: "CC Zero" },
	{ value: "CC-BY", name: "CC BY" },
	{ value: "CC-BY-SA", name: "CC BY-SA" },
	{ value: "CC-BY-ND", name: "CC BY-ND" },
	{ value: "CC-BY-NC", name: "CC BY-NC" },
	{ value: "CC-BY-NC-SA", name: "CC BY-NC-SA" },
	{ value: "CC-BY-NC-ND", name: "CC BY-NC-ND" },
]

const categories = [
	{ value: "development", name: "Développement" },
	{ value: "education", name: "Éducation" },
	{ value: "games", name: "Jeux" },
	{ value: "graphics", name: "Graphiques" },
	{ value: "internet", name: "Internet" },
	{ value: "multimedia", name: "Multimédia" },
	{ value: "office", name: "Bureautique" },
	{ value: "system", name: "Système" },
	{ value: "utilities", name: "Utilitaires" },
]

const profilTypes = {
	developer: {
		name: "Développeur",
		skills: [
			// Java
			{ value: "java", name: "Java", color: "#E76F00" },
			// JavaScript
			{
				value: "javascript",
				name: "JavaScript",
				color: "#F5DD1B",
			},
			{
				value: "typescript",
				name: "TypeScript",
				color: "#3178C6",
			},
			{ value: "react", name: "React", color: "#61DEFB" },
			{ value: "nextjs", name: "Next.js", color: "#0070F3" },
			{
				value: "react-native",
				name: "React Native",
				color: "#61DEFB",
			},
			{ value: "vuejs", name: "Vue.js", color: "#41B883" },
			{ value: "nuxtjs", name: "Nuxt.js", color: "#41B883" },
			{ value: "angular", name: "Angular", color: "#DD0031" },
			{ value: "nodejs", name: "Node.js", color: "#73AF5E" },
			{ value: "express", name: "Express", color: "#4F9F3C" },
			{ value: "nestjs", name: "NestJS", color: "#EA2845" },
			// PHP
			{ value: "php", name: "PHP", color: "#8892BF" },
			{ value: "symfony", name: "Symfony", color: "#000000" },
			{ value: "laravel", name: "Laravel", color: "#FF4C27" },
			// Python
			{ value: "python", name: "Python", color: "#FCD348" },
			{ value: "django", name: "Django", color: "#44B78B" },
			// Ruby
			{ value: "ruby", name: "Ruby", color: "#CC0000" },
			{
				value: "ruby-on-rails",
				name: "Ruby On Rails",
				color: "#CC0000",
			},
			// C and others
			{ value: "c", name: "C", color: "#A8B9CC" },
			{ value: "c++", name: "C++", color: "#00599C" },
			{ value: "c#", name: "C#", color: "#1E9E25" },
			// Databases
			{ value: "sql", name: "SQL", color: "#E48E00" },
			{ value: "mongodb", name: "MongoDB", color: "#13AA52" },
		],
	},
	"ux-designer": {
		name: "UX Designer",
		skills: [
			{ value: "figma", name: "Figma" },
			{ value: "xd", name: "Adobe XD" },
		],
	},
	"accessibility-expert": {
		name: "Expert en accessibilité",
		skills: [{ value: "ergonomy", name: "Ergonomie" }],
	},
	"ui-designer": {
		name: "UI Designer",
		skills: [
			{
				value: "illustrator",
				name: "Illustrator",
				color: "#FF9A00",
			},
			{ value: "photoshop", name: "Photoshop", color: "#00C8FF" },
			{ value: "branding", name: "Charte graphique" },
			{ value: "xd", name: "Adobe XD" },
			{ value: "figma", name: "Figma" },
		],
	},
	"project-manager": {
		name: "Chef de projet",
		skills: [{ value: "slack", name: "Slack" }],
	},
	"network-expert": {
		name: "Expert réseau",
		skills: [{ value: "security", name: "Sécurité" }],
	},
	"database-expert": {
		name: "Expert en base de données",
		skills: [
			{ value: "sql", name: "SQL", color: "#E48E00" },
			{ value: "mongodb", name: "MongoDB", color: "#13AA52" },
		],
	},
	translator: {
		name: "Traducteur",
		skills: [
			{ value: "english", name: "Anglais", color: "#C1121F" },
			{ value: "french", name: "Français", color: "#002395" },
			{ value: "german", name: "Allemand", color: "#FFCE00" },
			{ value: "italian", name: "Italien", color: "#009246" },
			{ value: "spanish", name: "Espagnol", color: "#FFF200" },
			{ value: "russian", name: "Russe", color: "#0000FE" },
			{ value: "chinese", name: "Chinois", color: "#DE2810" },
			{ value: "japanese", name: "Japonais", color: "#FFFFFF" },
		],
	},
}

export const populateProjects = async (req, res) => {
	try {
		const users = await User.find()
		const lengthProfiles = Object.getOwnPropertyNames(profilTypes).length
		for (let i = 0; i < 10; i++) {
			const index = Math.floor(Math.random() * (users.length - 1))
			const userId = users[index]._id
			const jobs = []
			for (let j in profilTypes) {
				const requiredNb = Math.round(Math.random() * 5 + 1)
				let skills = profilTypes[j].skills
					.map((a) => {
						if (profilTypes[j].skills.length > 1) {
							return Boolean(Math.round(Math.random() * 0.8))
								? a.value
								: false
						} else {
							return profilTypes[j].skills[0].value
						}
					})
					.filter((x) => x)

				skills =
					skills.length > 0
						? skills
						: [profilTypes[j].skills[0].value]

				Boolean(Math.round(Math.random() * 0.8)) &&
					jobs.push({
						type: j,
						requiredNb,
						skills,
						nameCollabPeople: users
							.sort((a, b) => 0.5 - Math.random())
							.slice(0, requiredNb - 1)
							.map((user) =>
								Math.round(Math.random() * 0.8)
									? {
											name: user.name,
											// TODO Add Object ID
											_collab: Types.ObjectId(
												user["_id"]
											),
									  }
									: false
							)
							.filter((x) => x),
					})
			}
			const tags = categories
				.map((a) => (Math.round(Math.random() * 0.8) ? a.value : false))
				.filter((x) => x)

			const el = new Project({
				author: Types.ObjectId(userId),
				title: faker.name.title(),
				sumup: faker.lorem.sentences(Math.floor(Math.random() * 2 + 1)),
				description: faker.lorem.paragraphs(
					Math.floor(Math.random() * 4 + 1)
				),
				licence:
					licenses[Math.floor(Math.random() * (licenses.length - 1))]
						.value,
				tags,
				active: true,
				links: [
					{
						title: "github",
						value: "https://github.com/aurelien-robineau",
					},
					{
						title: "github",
						value: "https://github.com/preneyv",
					},
					{
						title: "github",
						value: "https://github.com/preneyv",
					},
				],
				contact: faker.internet.email(),
				jobs,
				collabRequest: {
					_id: users[0]._id,
					name: users[0].name,
					type: jobs[0].type,
				},
			})
			await el.save()
			return res.json({
				success: "Successufully populate project document",
			})
			// data.push(el)
		}

		return res.json({ data })
	} catch (e) {
		res.json({ error: e })
	}
}

export const populateUsers = (req, res) => {
	try {
		const users = []
		const pwds = []
		for (let i = 0; i < 10; i++) {
			const password = faker.internet.password(16)
			const email = faker.internet.email()
			pwds.push({
				email,
				password,
			})
			const user = {
				name: faker.name.findName(),
				email,
				password: passwordHash.generate(password),
				isSuperAdmin: false,
			}
			users.push(user)
		}

		User.insertMany(users, (error, docs) => {
			if (error) return res.json(error)
			return res.json({ pwds, result: docs })
		})
	} catch (error) {
		return res.json(error)
	}
}
