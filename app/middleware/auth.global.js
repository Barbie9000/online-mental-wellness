export default defineNuxtRouteMiddleware((to, from) => {
    const { user, loggedIn } = useUserSession()

    if(loggedIn.value && to.path==='/auth/login'){
        return navigateTo(`/${user.value.auth?.role}`)
    }
    
    const unauthenticatedCallbackUrl = /patient|therapist|admin/.test(from.path?.split('/')[1]) ? '/auth/login' : from.path;

    if (to.path.startsWith('/patient') && user.value?.auth.role !== 'patient') {
        return navigateTo(unauthenticatedCallbackUrl)
    }

    if (to.path.startsWith('/therapist') && user.value?.auth.role !== 'therapist') {
        return navigateTo(unauthenticatedCallbackUrl)
    }

    if (to.path.startsWith('/admin') && user.value?.auth.role !== 'admin') {
        return navigateTo(unauthenticatedCallbackUrl)
    }

})