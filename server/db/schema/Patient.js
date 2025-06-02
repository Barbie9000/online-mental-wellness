import { Schema } from "mongoose"



const patientSchema = new Schema({
    id: {
        type: String
    },
    personalInfo: {
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            },
            other: {
                type: String,
            },
        },
        gender: {
            type: String,
            required: true,
            enum: ["M", "F"]
        },
        doB: {
            type: Date
        }
    },
    contactInfo: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
        }
    },
    emergency: {
        names: {
            type: String,
        },
        phone: {
            type: String
        },
        relationship: {
            type: String,
        }
    },
    auth: {
        role: {
            type: String,
            default: 'patient',
            immutable: true
        },
        password: {
            type: String,
            required: true
        }
    }
}, { timestamps: true })


patientSchema.pre('save', async function () {
    if (this.isNew) {
        this.id = `P-${(await this.collection.countDocuments({}) + 1).toString().padStart(3, '0')}`
    }
})

export default patientSchema;