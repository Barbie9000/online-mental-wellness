import { getModel } from "~~/server/db/models/register"


const Appointment = getModel('Appointment')
export default defineEventHandler(async event => {
    const { date, symptoms } = await readAndValidateBody(event, { include: ['date'] })

    await Appointment.create({
        patient: event.context?.user?._id,
        date,
        ...(symptoms ? { symptoms } : {})
    })
})