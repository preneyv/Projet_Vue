// TODO: Handle Error Unreadable Id on route getOneById

import Project from "../models/Project.js"
import mongoose from 'mongoose'

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
    console.log(id)
    try {
        const project = await Project.aggregate([
                { $match: { $or:[{author: mongoose.Types.ObjectId(id)},{'jobs.nameCollabPeople._collab': mongoose.Types.ObjectId(id)}]}}
            ])
            .addFields({
                        stateUser:{
                                $cond:[{$eq:['$author',mongoose.Types.ObjectId(id)]}, 'Admin', "Collab"]
                            }
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

// Working
export async function updateOne(req, res) {
    const { id } = req.params
    try{
        Project.updateOne({_id:id},{$push:{tags:req.body.tagValue}}).then().catch(e=>console.log(e))
        
    }catch(e){
        console.log(e)
    }
    
    //res.json(req.body)
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
