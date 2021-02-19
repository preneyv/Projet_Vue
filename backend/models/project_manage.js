import * as db_mongo from 'mongoose'

const projectSchema = db_mongo.Schema({})
let Project = db_mongo.model('Project', projectSchema)

function addProject(schema){
    const project = new Project({...schema})
    project.save()
}

function getProject(){
    model.find({requete})
    .then(projects => {return projects})
    .catch(error => {return error})
}



export {addProject, getProject}


