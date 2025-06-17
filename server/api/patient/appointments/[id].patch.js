import { getModel } from "~~/server/db/models/register"

const Appointment = getModel("Appointment")

export default defineEventHandler(async event => {
    const appointmentId = getRouterParam(event, "id")

    const { rating } = getQuery(event);

    await Appointment.findByIdAndUpdate(appointmentId, {
        rating
    })
})