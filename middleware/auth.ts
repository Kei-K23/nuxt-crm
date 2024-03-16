export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === "/about" && from.path === "/contact") {
        return navigateTo('/login')
    }
})