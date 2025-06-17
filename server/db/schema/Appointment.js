import { Schema, SchemaTypes } from "mongoose"

const appointmentSchema = new Schema({
    assignedTherapist: {
        type: SchemaTypes.ObjectId,
        ref: 'Therapist'
    },
    patient: {
        type: SchemaTypes.ObjectId,
        ref: 'Patient',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    symptoms: {
        type: String,
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
}, { timestamps: true })


export default appointmentSchema;