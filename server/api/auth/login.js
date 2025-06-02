import { getModel } from "~~/server/db/models/register"
import { readAndValidateBody } from "~~/server/utils/event"

const Admin = getModel('Admin')
const Therapist = getModel('Therapist')
const Patient = getModel('Patient')


export default defineEventHandler(async event => {
    const { email, password: plainPassword, rememberMe = false } = await readAndValidateBody(event, { include: ['email', 'password'] })

    let user = await Patient.findOne({ 'contactInfo.email': email }) || await Therapist.findOne({ 'contactInfo.email': email }) || await Admin.findOne({ email })

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: "User not found"
        });
    }

    // Verify password
    const isValidPassword = await verifyPassword(user.auth.password, plainPassword);
    
    if (!isValidPassword) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Invalid Password'
        });
    }

    user = user.toObject()

    // Create session object
    const session = {
        user: {
            ...user,
            auth: {
                ...user.auth,
                password: undefined
            }
        },
        loggedInAt: Date.now(),
    };

    const authOptions = {};

    if (rememberMe) {
        authOptions.maxAge = 7 * 24 * 60 * 60
    }


    // Set the user session and return
    await setUserSession(event, session, authOptions);
})