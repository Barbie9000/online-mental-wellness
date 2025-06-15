import { Schema, SchemaTypes } from "mongoose";

const donationSchema = new Schema({
    patient: {
        type: SchemaTypes.ObjectId,
        ref: 'Patient'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'KES'
    },
    status: {
        type: String,
        default: 'initialized',
        enum: ['failed', 'initialized', 'cancelled', 'processed']
    },
    checkoutRequestID: {
        type: String,
    },
    trnxID: {
        type: String,
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true })


export default donationSchema;