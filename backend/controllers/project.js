import Project from "../models/Project.js"
import mongoose from "mongoose"

/**
 * Get all the Projects in the database
 * @param {express.Response} req
 * @param {express.Response} res
 */
export async function getAll(req, res) {
	try {
		const projects = await Project.find({})
		return res.json(projects)
	} catch (e) {
		return res.json({ message: `Error: ${e}` })
	}
}

/**
 * Get all the projects in the database by User Id
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getAllByUserId(req, res) {
	const { _id } = req.user
	const { Types } = mongoose

	try {
		const project = await Project.aggregate([
			{
				$match: {
					$or: [
						{ author: Types.ObjectId(_id) },
						{ "jobs.nameCollabPeople._collab": Types.ObjectId(_id) }
					],
				},
			},
		]).addFields({
			stateUser: {
					$cond: [
						{ $eq: ["$author", Types.ObjectId(_id)] },
						"Admin",
						"Collab",
					],
			},
		})

		return res.json(project)
	} catch (e) {
		return res.json({ error: e.response })
	}
}

/**
 * Get One Project with a specified Id
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getOneById(req, res) {
	const { id } = req.params
	try {
		const project = await Project.findOne({ _id: id })
		return res.json(project)
	} catch (e) {
		return res.json({ error: "Le project n'existe pas" })
	}
}

/**
 * Insert a new Project in the Database
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function insertOne(req, res) {
	const user = req.user

	const {
		title,
		sumup,
		description,
		tags,
		licence,
		contact,
		links,
		jobs,
	} = req.body

	try {
		const project = new Project({
			title,
			sumup,
			author: user._id,
			description,
			tags,
			licence,
			contact,
			links,
			jobs,
		})
		project.save((err) => {
			if (err)
				return console.error(err)
			return res.json(project)
		})
	} catch (e) {
		return res.json({ error: e })
	}
}

/**
 * Update a project with an Id specified
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateOne(req, res) {
	const { id } = req.params
	const filter = req.body.filter ? { _id: id, ...req.body.filter } : { _id: id }
	const body = req.body.body ?  req.body.body :  req.body
	const tail = req.body.tail ? { ...req.body.tail } : {}

	const { options } = req.body

	if(options && options.changeToObjId)
		changeToObjId(req.body.body)

    try {
		const project = await Project.updateOne(filter, body, tail)
		res.json({ found: project.n, modified: project.nModified })
	} catch (e) {
		res.json({ error: e.errmsg })
	}
}

/**
 * Delete a Project with a specific Id
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteOneById(req, res) {
	const { id } = req.params
	Project.deleteOne({ _id: id }, (err) => {
		if (err) return res.status(500).json(err)
		res.json({
			message: "Project deleted successfully",
		})
	})
}

/**
 * Sert à modifier les identifiants en ObjectID
 * @param {*} request La requête dont il faut modifier les identifiants en ObjectID
 */
function changeToObjId(request) {
	const { Types } = mongoose
	const el = request['$pull'] ? request['$pull'] : request['$push']

	for (const item in el) {

		for (const line in el[item]) {
			if(line.startsWith('_')) el[item][line] = Types.ObjectId(el[item][line])
		}
	}
}
