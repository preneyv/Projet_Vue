import api from "../config/api"

const ContactService = {
    /**
     * Get all contact requests
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAll: async function() {
        return await api.get(`/contact`)
    }
}

export default ContactService
