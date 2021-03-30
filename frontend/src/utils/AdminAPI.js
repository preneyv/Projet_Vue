
import Axios from 'axios'
import config from '@/config.js'
const AdminAPI={

        //Grab all project matching the id (the author's one)
        getListProject : function(id) {
            let resultat = Axios.get(`${config.API_URL}project/user/${id}`)
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
        setStateProject: function(id, value) {
            let response = Axios.put(`${config.API_URL}project/${id}`,{$set:{stateProject:value,lastUpdate:Date()}})
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    console.log(error)
                                })

            return response
        },

        removeCollabFromProject(idProject, id, typeValue) {
            console.log(typeValue)
            let reqBody = typeValue === undefined ? {body:{$pull:{'jobs.$[].nameCollabPeople':{_collab:id}}}, tail:{multi:true}, options:{changeToObjId:true}}  : {filter : { 'jobs.type': typeValue}, body: {$pull:{'jobs.$.nameCollabPeople':{_collab:id}}}, options:{changeToObjId:true}} ;
            let response = Axios.put(`${config.API_URL}project/${idProject}`, reqBody )
                                .then((res)=> {
                                    console.log(res)
                                    return res
                                }).catch((error)=> {
                                    return error
                                })

            return response
        },

        addCollabToProject(idProject, {_id, type, name}) {
            
            let reqBody = {filter : { 'jobs.type': type}, body: {$push:{'jobs.$.nameCollabPeople':{name:name, _collab:_id}}}, options:{changeToObjId:true}}
            console.log(reqBody)
            let response = Axios.put(`${config.API_URL}project/${idProject}`, reqBody )
                                .then( async(res)=> {
                                    let response = await this.removeFromCollabRequest(idProject, _id)
                                    console.log(response)
                                    if(!response.data.modified) throw 'error'
                                    return res 
                                }).catch((error)=> {
                                    return error
                                })

            return response
        },

        removeFromCollabRequest(idProject, idCollab) {

            let reqBody = {body:{$pull:{'collabRequest':{_id:idCollab}}},options:{changeToObjId:true}}
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