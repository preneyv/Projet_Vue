import jwt from "jsonwebtoken"
import api from "../api"
import store from "../store"

const AuthService = {
    signin: (email, password) => {
        return api.post(`/auth/signin`, { email, password }).then(response => {
            localStorage.setItem("token", response.data.token)
            store.commit("setAuthenticated", true)
            store.commit("setUser", jwt.decode(response.data.token))
        })
    },

    signup: (name, email, password, externals) => {
        return api.post(`/auth/signup`, { name, email, password, externals }).then(response => {
            localStorage.setItem("token", response.data.token)
            store.commit("setAuthenticated", true)
            store.commit("setUser", jwt.decode(response.data.token))
        })
    },

    signout: () => {
        localStorage.removeItem("token")
        store.commit("setAuthenticated", false)
        store.commit("setUser", null)
    },

    updateStoreFromToken: () => {
        const token = localStorage.getItem("token")
        if (!token) {
            store.commit("setAuthenticated", false)
            store.commit("setUser", null)
        }
        else {
            store.commit("setAuthenticated", true)
            store.commit("setUser", jwt.decode(token))
        }
    }
}

export default AuthService