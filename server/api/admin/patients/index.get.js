import { getModel } from "~~/server/db/models/register"

const Patient = getModel("Patient")
export default defineEventHandler(async () => {

    const patients = await Patient.find({})

    return patients.map(p => ({
        id: p.id,
        names: `${p.personalInfo.name.first} ${p.personalInfo.name.last} ${p.personalInfo.name.other ?? ''}`,
        email: p.contactInfo.email,
        phone: p.contactInfo.phone,
        loggedInAt: p.auth.lastLoggedInAt,
        emergencyNames: p.emergency?.names,
        emergencyPhone: p.emergency?.phone,
        emergencyRelationship: p.emergency?.relationship,
    }))


})