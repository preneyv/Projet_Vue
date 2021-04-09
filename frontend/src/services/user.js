import api from "../api"

const UserService = {
    getUserInfoById: async function(id){
        return await api.get(`/user/${id}`)
    }
}

export default UserService