import { getModel } from "~~/server/db/models/register";


const Therapist = getModel('Therapist')

export default defineEventHandler(async event => {
    const user = event.context.user;
    const { status } = await getValidatedQuery(event, (query) => {
        if (!query.status) {
            throw createError({
                status: 400,
                message: 'Status query is required'
            })
        }

        return query
    })


    await Therapist.findByIdAndUpdate(user._id, { availabilityStatus: status })

    const session = {
        user: {
            ...user,
            availabilityStatus: status,
        },
        updatedAt: Date.now(),
    };

    await replaceUserSession(event, session)
})