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
		res.json(projects)
	} catch (e) {
		res.json({ message: `Error: ${e}` })
	}
}

/**
 * Get all the projects in the database by User Id
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getAllByUserId(req, res) {
	const { id } = req.params
	const { Types } = mongoose
	console.log(id)
	try {
		const project = await Project.aggregate([
			{
				$match: {
					$or: [
						{ author: Types.ObjectId(id) },
						{
							"jobs.nameCollabPeople._collab": Types.ObjectId(id),
						},
					],
				},
			},
		]).addFields({
			stateUser: {
				$cond: [
					{ $eq: ["$author", Types.ObjectId(id)] },
					"Admin",
					"Collab",
				],
			},
		})

		res.json(project)
	} catch (e) {
		res.json({ error: e.response })
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
		res.json(project)
	} catch (e) {
		res.json({ error: "Le project n'existe pas" })
	}
}

/**
 * Insert a new Project in the Database
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function insertOne(req, res) {
	const user = req.user
	console.log(req.body)
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
			if (err) return console.error(err)
			res.json(project)
		})
	} catch (e) {
		res.json({ error: e })
	}
}

/**
 * Update a project with an Id specified
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateOne(req, res) {
	const { id } = req.params
	try {
		const project = await Project.updateOne({ _id: id }, req.body)
		res.json({ found: project.n, modified: project.nModified })
	} catch (e) {
		res.json({ error: e })
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
