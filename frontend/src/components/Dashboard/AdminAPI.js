
import Axios from 'axios'
import config from '@/config.js'
const AdminAPI={

        //Grab all project matching the id (the author's one)
        getListProject : function(id) {
            let resultat = Axios.get(`${config.API_URL}project/projects/${id}`)
                                .then((res)=> {
                                    return res
                                })
                                .catch((error)=>{
                                    console.log(error)
                                })
            return resultat
        },

        // Add a tag matching the id (project Id)
        addTagToProject : function(id, tag) {

            let resultat = Axios.put(`${config.API_URL}project/${id}`,{$set:{lastUpdate:Date()},$push:{tags:tag}})
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    console.log(error)
                                })

            return resultat
        },


        //TODO : Add job requirement matching the id (project id)
        addJobRequirement: function(id, job) {
            console.log(job)
            let response = Axios.put(`${config.API_URL}project/${id}`,{$set:{lastUpdate:Date()},$push:{jobs:job}})
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    console.log(error)
                                })

            return response
        },


        //TODO : Add a co-worker into the matching project (project id) and the matching type of collab (type of job) - Add the user id

        //TODO : Add link into the matching project(project id)
        addLinkToProject: function(id, link) {
            let response = Axios.put(`${config.API_URL}project/${id}`,{$set:{lastUpdate:Date()},$push:{links:link}})
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    console.log(error)
                                })

            return response
        },


        setDescription: function(id, value) {
            let response = Axios.put(`${config.API_URL}project/${id}`,{$set:{description:value,lastUpdate:Date()}})
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    console.log(error)
                                })

            return response
        },

        removeCollabFromProject(idProject, name, typeValue) {
            console.log(name)
            let reqBody = typeValue === undefined ? {body:{$pull:{'jobs.$[].nameCollabPeople':{name:name}}}, tail:{multi:true}}  : {filter : { 'jobs.type': typeValue}, body: {$pull:{'jobs.$.nameCollabPeople':{name:name}}}} ;
            let response = Axios.put(`${config.API_URL}project/${idProject}`, reqBody )
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    return error
                                })

            return response
        }



    
}

export default AdminAPI