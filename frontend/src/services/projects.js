import api from "@/config/api"

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
	getAuthorProjects: async () => {
		return await api.get(`/project/user`)
	},

    /**
     * Toutes les méthodes qui suivent sont définies dans le fichier dashboardLogic.js, ProjectDash.vue ou SingleProject.vue
     */
    addTagToProject: async function(id, tag) {
        return await api.put(`/project/${id}`, {$set:{lastUpdate:Date()},$push:{tags:tag}})
    },

    addJobRequirement: async function(id, job) {
        return await api.put(`/project/${id}`,{$set:{lastUpdate:Date()},$push:{jobs:job}})
    },

    addLinkToProject: async function(id, link) {
        return await api.put(`/project/${id}`,{$set:{lastUpdate:Date()},$push:{links:link}})
    },

    setDescription: async function(id, value) {
        return await api.put(`/project/${id}`,{$set:{description:value,lastUpdate:Date()}})
    },
    setStateProject: async function(id, value) {
        return await api.put(`/project/${id}`,{$set:{stateProject:value,lastUpdate:Date()}})
    },

    removeCollabFromProject: async function(idProject, id, typeValue) {
        console.log(typeValue)
        let reqBody = typeValue === undefined ?
            {body:{$pull:{'jobs.$[].nameCollabPeople':{_collab:id}}}, tail:{multi:true}, options:{changeToObjId:true}}  :
            {filter : { 'jobs.type': typeValue}, body: {$pull:{'jobs.$.nameCollabPeople':{_collab:id}}}, options:{changeToObjId:true}} ;

        return await api.put(`/project/${idProject}`, reqBody )
    },

    addCollabToProject: async function(idProject, {_id, type, name}) {
        
        let reqBody = {filter : { 'jobs.type': type}, body: {$push:{'jobs.$.nameCollabPeople':{name:name, _collab:_id}}}, options:{changeToObjId:true}}
        return await api.put(`/project/${idProject}`, reqBody )
    },

    removeFromCollabRequest: async function(idProject, idCollab) {

        let reqBody = {body:{$pull:{'collabRequest':{_id:idCollab}}},options:{changeToObjId:true}}
        return await api.put(`/project/${idProject}`, reqBody )
    },

    addToCollabRequest: async function(idProject, {_id, name, type}) {

        let reqBody = {body: {$push:{collabRequest:{_id:_id, name:name, type:type}}}, options:{changeToObjId:true}}
        return await api.put(`/project/${idProject}`, reqBody)
    }


}

export default ProjectsService