
import Axios from 'axios'
import config from '@/config.js'
export default AdminAPI={

        getListProject : function(id){
            Axios.get(`${config.API_URL}project/projects/${id}`)
            .then()
            .catch()
        }
    
}