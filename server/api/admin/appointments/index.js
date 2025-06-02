import { getModel } from "~~/server/db/models/register"

const Appointment = getModel("Appointment")
export default defineEventHandler(async event => {

    const appointments = await Appointment.find({}).populate('patient assignedTherapist')


    return appointments.map(appointment => ({
        patientId: appointment.patient.id,
        patientName: buildName(appointment.patient?.personalInfo?.name),
        date: formatDate(appointment.date),
        time: appointment.time ?? 'N/A',
        therapistName: `Dr. ${buildName(appointment.assignedTherapist?.personalInfo.name)}`,
        status: appointment.status,
    }))


})