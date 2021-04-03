import api from "../api"

const ProjectsService = {
	createProject: (data) => {
		return api.post(`/project`, data).then((res) => res)
	},
    // Get all Projects
	getAllProjects: async () => {
		const res = await api.get(`/project`)
        return res
	},

    // Get One Project by Id
	getProjectById: async (id) => {
		const res = await api.get(`/project/${id}`)
        return res
	},

	// Get all projects of an author
	getAuthorProjects: (authorId) => {
		return api.get(`/project/user/${authorId}`).then((res) => res)
	},

    addTagToProject: function(id, tag) {
        return api.put(`/project/${id}`, {$set:{lastUpdate:Date()},$push:{tags:tag}})
            .then(res => res)
    },

    //TODO : Add job requirement matching the id (project id)
    addJobRequirement: function(id, job) {
        return api.put(`/project/${id}`,{$set:{lastUpdate:Date()},$push:{jobs:job}})
                            .then((res)=> {
                                return res
                            }).catch((error)=> {
                                console.log(error)
                            })

    },


    //TODO : Add link into the matching project(project id)
    addLinkToProject: function(id, link) {
        return api.put(`/project/${id}`,{$set:{lastUpdate:Date()},$push:{links:link}})
                .then((res)=> {
                    return res
                }).catch((error)=> {
                    console.log(error)
                })

    },


    setDescription: function(id, value) {
        return api.put(`/project/${id}`,{$set:{description:value,lastUpdate:Date()}})
                .then((res)=> {
                    return res
                }).catch((error)=> {
                    console.log(error)
                })
    },
    setStateProject: function(id, value) {
        return api.put(`/project/${id}`,{$set:{stateProject:value,lastUpdate:Date()}})
                .then((res)=> {
                    return res
                }).catch((error)=> {
                    console.log(error)
                })
    },

    removeCollabFromProject(idProject, id, typeValue) {
        console.log(typeValue)
        let reqBody = typeValue === undefined ? {body:{$pull:{'jobs.$[].nameCollabPeople':{_collab:id}}}, tail:{multi:true}, options:{changeToObjId:true}}  : {filter : { 'jobs.type': typeValue}, body: {$pull:{'jobs.$.nameCollabPeople':{_collab:id}}}, options:{changeToObjId:true}} ;
        return api.put(`/project/${idProject}`, reqBody )
                .then((res)=> {
                    console.log(res)
                    return res
                }).catch((error)=> {
                    return error
                })

    },

    addCollabToProject(idProject, {_id, type, name}) {
        
        let reqBody = {filter : { 'jobs.type': type}, body: {$push:{'jobs.$.nameCollabPeople':{name:name, _collab:_id}}}, options:{changeToObjId:true}}

        return api.put(`/project/${idProject}`, reqBody )
                .then( async(res)=> {
                    let response = await this.removeFromCollabRequest(idProject, _id)
                    console.log(response)
                    if(!response.data.modified) throw 'error'
                    return res 
                }).catch((error)=> {
                    return error
                })

    },

    removeFromCollabRequest(idProject, idCollab) {

        let reqBody = {body:{$pull:{'collabRequest':{_id:idCollab}}},options:{changeToObjId:true}}
        return api.put(`/project/${idProject}`, reqBody )
                .then((res)=> {
                    return res
                }).catch((error)=> {
                    return error
                })
    }

}

export default ProjectsService