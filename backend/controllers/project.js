import Project from "../models/Project.js"

export async function getAll(req, res) {
    try {
        const projects = await Project.find({})
        res.json(projects)
    } catch (e) {
        res.json({ message: `Error: ${e}` })
    }
}
export async function getOne(req, res) {
    const { id } = req.body
    try {
        const project = await Project.findOne({ _id: id })
        res.json()
    } catch (e) {
        res.json({ message: `Error: ${e}` })
    }
}
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
        res.json({ message: `Error: ${e}` })
    }
}
