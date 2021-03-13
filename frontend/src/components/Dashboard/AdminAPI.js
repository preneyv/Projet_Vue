
import Axios from 'axios'
import config from '@/config.js'
export default AdminAPI={

        //Grab all project matching the id (the author's one)
        getListProject : function(id){
            Axios.get(`${config.API_URL}project/projects/${id}`)
            .then()
            .catch()
        }

        //TODO : Add a tag matching the id (project Id)


        //TODO : Add job requirement matching the id (project id)


        //TODO : Add a co-worker into the matching project (project id) and the matching type of collab (type of job) - Add the user id

        //TODO : Add link into the matching project(project id)


    
}