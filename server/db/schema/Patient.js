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
        },
        lastLoggedInAt: {
            type: Date
        }
    }
}, { timestamps: true })


patientSchema.pre('save', async function () {
    if (this.isNew) {
        // Find the most recently created patient
        const lastPatient = await this.collection
            .findOne({}, { sort: { createdAt: -1 } })

        let nextNumber = 1

        if (lastPatient && lastPatient.id) {
            // Extract number from ID like "P-001" -> 1
            const lastNumber = parseInt(lastPatient.id.replace('P-', ''))
            nextNumber = lastNumber + 1
        }

        this.id = `P-${nextNumber.toString().padStart(3, '0')}`
    }
})

export default patientSchema;