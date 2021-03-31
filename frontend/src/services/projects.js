import api from "../api"

const ProjectsService = {
    createProject: (data) => {
        return api.post(`/project`, data)
            .then(res => res)
    },
    
    // Get all projects of an author
    getAuthorProjects: (authorId) => {
        return api.get(`/project/projects/${authorId}`)
            .then(res => res)
    },

    //Grab all project matching the id (the author's one)
    // getListProject : function(id) {
        
    //     let resultat = Axios.get(`${config.API_URL}project/projects/${id}`)
    //                         .then((res)=> {
    //                             return res
    //                         })
    //                         .catch((error)=>{
    //                             console.log(error)
    //                         })
    //     return resultat
    // },

    // TODO : Add a tag matching the id (project Id)

    addTagToProject: (id, tag) => {
        return api.put(`/project/${id}`, { tagValue: tag })
            .then(res => res)
    }


    // TODO : Add job requirement matching the id (project id)

    // TODO : Add a co-worker into the matching project (project id) and the matching type of collab (type of job) - Add the user id

    // TODO : Add link into the matching project(project id)

}

export default ProjectsService