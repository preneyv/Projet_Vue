import jwt from "jsonwebtoken"
import api from "../api"

const AuthService = {
    signin: (email, password) => {
        return api.post(`/auth/signin`, { email, password }).then(response => {
            localStorage.setItem("token", response.data.token)
        })
    },

    signup: (name, email, password, externals) => {
        return api.post(`/auth/signup`, { name, email, password, externals }).then(response => {
            localStorage.setItem("token", response.data.token)
        })
    },

    signout: () => {
        localStorage.removeItem("token")
    },

    isSignedIn: () => {
        return !!localStorage.getItem("token")
    },

    getUser: () => {
        const token = localStorage.getItem("token")
        if (!token) return null

        return jwt.decode(token)
    },
}

export default AuthService