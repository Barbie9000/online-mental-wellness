import { getModel } from "~~/server/db/models/register"
import { readAndValidateBody } from "~~/server/utils/event"

const Patient = getModel("Patient")
export default defineEventHandler(async event => {
    const { firstName, lastName, otherName = null, gender, email, password: plainPassword } = await readAndValidateBody(event, { include: ['firstName', 'lastName', 'gender', 'email', 'password'] })

    await Patient.create({
        personalInfo: {
            name: {
                first: firstName,
                last: lastName,
                ...(otherName ? { other: otherName } : {})
            },
            gender
        },
        contactInfo: {
            email
        },
        auth: {
            password: await hashPassword(plainPassword)
        }
    })
})