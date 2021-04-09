import api from "../config/api"

const UserService = {
    /**
     * Récupère toutes les infos de l'utilisateur (Partie requête axios)
     * @param id identifiant de l'utilisateur en base de données.
     * @returns {Promise<AxiosResponse<any>>}
     */
    getUserInfoById: async function(id){
        return await api.get(`/user/${id}`)
    },
    /**
     * Ajoute un nouveau lien à l'utilisateur (Partie requête axios)
     * @param id identifiant de l'utilisateur en base de données.
     * @param link nouveau lien à ajouter
     * @returns {Promise<AxiosResponse<any>>}
     */
    addLinkToExternals: async function(id,link) {
        return await api.put(`/user/${id}`, {$push:{externals:link}})
    }
}

export default UserService