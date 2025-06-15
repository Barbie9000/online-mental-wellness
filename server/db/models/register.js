import { model } from "mongoose";
import adminSchema from "../schema/Admin";
import appointmentSchema from "../schema/Appointment";
import patientSchema from "../schema/Patient";
import therapistSchema from "../schema/Therapist";
import donationSchema from "../schema/Donation";



const MODELS_REGISTER = {
    Admin: model('Admin', adminSchema),
    Appointment: model('Appointment', appointmentSchema),
    Donation: model('Donation', donationSchema),
    Patient: model('Patient', patientSchema),
    Therapist: model('Therapist', therapistSchema)
}


export const getModel = (modelName) => {
    if (!(modelName in MODELS_REGISTER)) throw new Error('Model does not exist');

    return MODELS_REGISTER[modelName]
}