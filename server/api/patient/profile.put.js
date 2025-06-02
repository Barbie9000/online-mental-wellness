import { getModel } from "~~/server/db/models/register";

const Patient = getModel('Patient')

export default defineEventHandler(async event => {

    const { doB, phone, email, emergency: { names: emergencyNames, phone: emergencyPhone, relationship: emergencyRelationship } } = await readBody(event)

    const user = event.context.user;

    await Patient.findByIdAndUpdate(user._id, {
        ...(doB ? { 'personalInfo.doB': doB } : {}),
        ...(email ? { 'contactInfo.email': email } : {}),
        ...(phone ? { 'contactInfo.phone': phone } : {}),
        ...(emergencyNames ? { 'emergency.names': emergencyNames } : {}),
        ...(emergencyPhone ? { 'emergency.phone': emergencyPhone } : {}),
        ...(emergencyRelationship ? { 'emergency.relationship': emergencyRelationship } : {})
    })

    // Create session object
    const session = {
        user: {
            ...user,
            ...(doB ? { personalInfo: { ...user.personalInfo, doB } } : {}),
            ...((email || phone) ? {
                contactInfo: {
                    ...user.contactInfo,
                    ...(email ? { email } : {}),
                    ...(phone ? { phone } : {})
                }
            } : {}),
            ...((emergencyNames || emergencyPhone || emergencyRelationship) ? {
                ...user.emergency,
                ...(emergencyNames ? { names: emergencyNames } : {}),
                ...(emergencyPhone ? { phone: emergencyPhone } : {}),
                ...(emergencyRelationship ? { relationship: emergencyRelationship } : {})
            } : {}),

        },
        updatedAt: Date.now(),
    };

    await replaceUserSession(event, session)

})