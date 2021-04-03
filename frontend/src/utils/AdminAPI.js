
import Axios from 'axios'
import config from '@/config.js'
const AdminAPI={

        //Grab all project matching the id (the author's one)
        getListProject : function(id) {
            return  Axios.get(`${config.API_URL}/project/user/${id}`)
                          .then((res)=> {
                              return res
                          })
                          .catch((error)=>{
                              console.log(error)
                          })

        },

        // Add a tag matching the id (project Id)
        addTagToProject : function(id, tag) {

            return Axios.put(`${config.API_URL}/project/${id}`,{$set:{lastUpdate:Date()},$push:{tags:tag}})
                         .then((res)=> {
                             return res
                         }).catch((error)=> {
                             console.log(error)
                         })
        },


        //TODO : Add job requirement matching the id (project id)
        addJobRequirement: function(id, job) {
            return Axios.put(`${config.API_URL}/project/${id}`,{$set:{lastUpdate:Date()},$push:{jobs:job}})
                         .then((res)=> {
                             return res
                         }).catch((error)=> {
                             console.log(error)
                         })

        },

        //TODO : Add link into the matching project(project id)
        addLinkToProject: function(id, link) {
            return Axios.put(`${config.API_URL}/project/${id}`,{$set:{lastUpdate:Date()},$push:{links:link}})
                         .then((res)=> {
                             return res
                         }).catch((error)=> {
                             console.log(error)
                         })

        },


        setDescription: function(id, value) {
            return Axios.put(`${config.API_URL}/project/${id}`,{$set:{description:value,lastUpdate:Date()}})
                         .then((res)=> {
                             return res
                         }).catch((error)=> {
                             console.log(error)
                         })

        },
        setStateProject: function(id, value) {
            return  Axios.put(`${config.API_URL}/project/${id}`,{$set:{stateProject:value,lastUpdate:Date()}})
                          .then((res)=> {
                              return res
                          }).catch((error)=> {
                              console.log(error)
                          })

        },

        removeCollabFromProject(idProject, id, typeValue) {

            let reqBody = typeValue === undefined ? {body:{$pull:{'jobs.$[].nameCollabPeople':{_collab:id}}}, tail:{multi:true}, options:{changeToObjId:true}}  : {filter : { 'jobs.type': typeValue}, body: {$pull:{'jobs.$.nameCollabPeople':{_collab:id}}}, options:{changeToObjId:true}} ;
            return Axios.put(`${config.API_URL}/project/${idProject}`, reqBody )
                         .then((res)=> {
                             return res
                         }).catch((error)=> {
                             return error
                         })

        },

        addCollabToProject(idProject, {_id, type, name}) {
            
            let reqBody = {filter : { 'jobs.type': type}, body: {$push:{'jobs.$.nameCollabPeople':{name:name, _collab:_id}}}, options:{changeToObjId:true}}
            return Axios.put(`${config.API_URL}/project/${idProject}`, reqBody )
                         .then( async(res)=> {
                             let response = await this.removeFromCollabRequest(idProject, _id)
                             if(!response?.data.modified) throw 'error'
                             return res
                         }).catch((error)=> {
                             return error
                         })

        },

        removeFromCollabRequest(idProject, idCollab) {

            let reqBody = {body:{$pull:{'collabRequest':{_id:idCollab}}},options:{changeToObjId:true}}
            return Axios.put(`${config.API_URL}/project/${idProject}`, reqBody )
                         .then((res)=> {
                             return res
                         }).catch((error)=> {
                             return error
                         })
        }



    
}

export default AdminAPI