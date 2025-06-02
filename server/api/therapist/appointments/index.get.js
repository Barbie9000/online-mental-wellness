import { getModel } from "~~/server/db/models/register"

const Appointment = getModel("Appointment")
export default defineEventHandler(async event => {

    const user = event.context.user;

    const appointments = await Appointment.find({ assignedTherapist: user._id }).populate('patient')


    return appointments.map(appointment => ({
        _id: appointment._id,
        patientId: appointment.patient.id,
        patientName: buildName(appointment.patient?.personalInfo?.name),
        email: appointment.patient?.contactInfo?.email,
        phone: appointment.patient?.contactInfo?.phone,
        symptoms: appointment.symptoms,
        time: appointment.time,
        date: formatDate(appointment.date),
    }))


})