


export default defineEventHandler(async (event) => {

    if (event.path.startsWith('/api')) {
        const plainPath = event.path.replace('/api', '')

        const requiresAuth = /patient|therapist|admin/.test(plainPath.split('/')[1]);
        if (requiresAuth) {
            const session = await requireUserSession(event)
            const throwUnauthorizedError = () => {
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Unauthorized',
                })
            }

            if (plainPath.startsWith('/patient') && session.user?.auth.role !== 'patient') {
                throwUnauthorizedError()
            }

            if (plainPath.startsWith('/therapist') && session.user?.auth.role !== 'therapist') {
                throwUnauthorizedError()
            }

            if (plainPath.startsWith('/admin') && session.user?.auth.role !== 'admin') {
                throwUnauthorizedError()
            }

            event.context.user = session.user

        }
    }
})