import { getModel } from "~~/server/db/models/register"

const Patient = getModel("Patient")
export default defineEventHandler(async event => {
    const patientId = getRouterParam(event, "id")

    const deletedPatient = await Patient.findOneAndDelete({ id: patientId })


    if (!deletedPatient) {
        throw createError({
            statusCode: 404,
            message: "Patient does not exist"
        })
    }


})