import AuthService from "../services/auth"

export const authGuard = (to, from, next) => {
    if (AuthService.isSignedIn())
        next()
    else
        next(`/login?redirectTo=${to.name}`)
}

export const guestGuard = (to, from, next) => {
    if (!AuthService.isSignedIn())
        next()
    else
        next('/dashboard')
}