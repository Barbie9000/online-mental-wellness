import { getModel } from "~~/server/db/models/register"

const Appointment = getModel("Appointment")

export default defineEventHandler(async event => {
    const appointmentId = getRouterParam(event, "id")
    const user = event.context.user;

    const { status } = getQuery(event);
    const { time } = (await readBody(event)) ?? {}

    await Appointment.findByIdAndUpdate(appointmentId, {
        ...(time ? {
            time, assignedTherapist: user._id
        } : {}),
        ...(status ? { status } : {}),
    })
})