import store from "../store"

export const authGuard = (to, from, next) => {
    if (store.state.auth.authenticated)
        next()
    else
        next(`/login?redirectTo=${to.name}`)
}

export const guestGuard = (to, from, next) => {
    if (!store.state.auth.authenticated)
        next()
    else
        next('/dashboard')
}