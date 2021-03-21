import Project from "../models/Project.js"
import mongoose from "mongoose"

// Done
export async function getAll(req, res) {
	try {
		const projects = await Project.find({})
		res.json(projects)
	} catch (e) {
		res.json({ message: `Error: ${e}` })
	}
}

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

// Done
export async function getOneById(req, res) {
	const { id } = req.params
	try {
		const project = await Project.findOne({ _id: id })
		res.json(project)
	} catch (e) {
		res.json({ error: e })
	}
}

// Done
export async function insertOne(req, res) {
	const {
		title,
		author,
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
			author,
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

// Done
export async function updateOne(req, res) {

    //res.json(req.body)
	const { id } = req.params
	const filter = req.body.filter ? { _id: id, ...req.body.filter} : {_id: id}
	const body = req.body.body ? req.body.body : req.body
	const tail = req.body.tail ? {...req.body.tail} : {}
    console.log(filter)
	console.log(body)
	console.log(tail)
    try {
		const project = await Project.updateOne(filter, body, tail)
		res.json({ found: project.n, modified: project.nModified })
	} catch (e) {
		res.json({ error: e.errmsg })
	}
}

// Done
export async function deleteOneById(req, res) {
	const { id } = req.params
	Project.deleteOne({ _id: id }, (err) => {
		if (err) return res.status(500).json(err)
		res.json({
			message: "Project deleted successfully",
		})
	})
}
