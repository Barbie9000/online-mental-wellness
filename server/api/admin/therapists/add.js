import { getModel } from "~~/server/db/models/register"
import { readAndValidateBody } from "~~/server/utils/event"

const Therapist = getModel("Therapist")
export default defineEventHandler(async event => {
    const { firstName, lastName, otherName = null, gender, email, phone, yearRegistered } = await readAndValidateBody(event, { include: ['firstName', 'lastName', 'gender', 'email', 'phone', 'yearRegistered'] })

    await Therapist.create({
        personalInfo: {
            name: {
                first: firstName,
                last: lastName,
                ...(otherName ? { other: otherName } : {})
            },
            gender
        },
        contactInfo: {
            email,
            phone
        },
        yearRegistered
    })

})