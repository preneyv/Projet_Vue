import { createStore } from "vuex" 

const store = createStore({
    state() {
        return {
            auth: {
                authenticated: false,
                user: null
            }
        }
    },
    mutations: {
        setAuthenticated(state, authenticated) {
            state.auth.authenticated = authenticated
        },
        setUser(state, user) {
            state.auth.user = user
        }
    }
})

export default store