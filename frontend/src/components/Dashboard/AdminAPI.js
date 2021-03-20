
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

            let resultat = Axios.put(`${config.API_URL}project/${id}`,{tagValue:tag})
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    console.log(error)
                                })

            return resultat
        }


        //TODO : Add job requirement matching the id (project id)


        //TODO : Add a co-worker into the matching project (project id) and the matching type of collab (type of job) - Add the user id

        //TODO : Add link into the matching project(project id)
        addLinkToProject: function(id, link) {
            let response = Axios.put(`${config.API_URL}project/${id}`,{newLink:link})
                                .then((res)=> {
                                    return res
                                }).catch((error)=> {
                                    console.log(error)
                                })

            return response
        }


    
}

export default AdminAPI