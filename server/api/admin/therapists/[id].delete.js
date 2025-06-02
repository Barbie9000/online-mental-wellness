import { getModel } from "~~/server/db/models/register"

const Therapist = getModel("Therapist")
export default defineEventHandler(async event => {
    const therapistId = getRouterParam(event, "id")

    const deletedTherapist = await Therapist.findOneAndDelete({ id: therapistId })


    if (!deletedTherapist) {
        throw createError({
            statusCode: 404,
            message: "Therapist does not exist"
        })
    }


})