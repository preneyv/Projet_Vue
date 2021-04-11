import api from "@/config/api"

const UserService = {
	getUserInfoById: async function(id) {
		return await api.get(`/user/${id}`)
	},
}

export default UserService
