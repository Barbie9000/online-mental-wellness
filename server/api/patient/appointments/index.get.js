import { getModel } from "~~/server/db/models/register";
import { buildName, formatDate } from "~~/server/utils/uni";

const Appointment = getModel('Appointment');

export default defineEventHandler(async event => {
    const user = event.context.user;

    const appointments = await Appointment.find({ patient: user._id }).populate('assignedTherapist')

    return appointments.map(appointment => ({
        date: formatDate(appointment.date),
        time: appointment.time ?? 'N/A',
        therapist: buildName(appointment.assignedTherapist?.personalInfo?.name),
        status: appointment.status
    }))

})