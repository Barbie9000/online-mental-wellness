import mongoose, { Schema } from "mongoose"

const therapistSchema = new Schema({
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
        }
    },
    contactInfo: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
    },
    availabilityStatus: {
        type: String,
        enum: ['available', 'fully-booked'],
        default: 'available'
    },
    yearRegistered: {
        type: Number,
        required: true,
        validator: (year) => new Date().getFullYear() > year
    },
    auth: {
        role: {
            type: String,
            default: 'therapist',
            immutable: true
        },
        password: {
            type: String,
        },
        lastLoggedInAt: {
            type: Date
        }
    }
})


therapistSchema.virtual('yearsOfExperience').get(function () {
    return new Date().getFullYear() - this.yearRegistered
})

therapistSchema.set('toObject', { virtuals: true });
therapistSchema.set('toJSON', { virtuals: true });


therapistSchema.pre('save', async function () {
    if (this.isNew) {
        // Find the most recently created therapist
        const lastTherapist = await this.collection
            .findOne({}, { sort: { createdAt: -1 } })

        let nextNumber = 1

        if (lastTherapist && lastTherapist.id) {
            // Extract number from ID like "TH-001" -> 1
            const lastNumber = parseInt(lastTherapist.id.replace('TH-', ''))
            nextNumber = lastNumber + 1
        }

        this.id = `TH-${nextNumber.toString().padStart(3, '0')}`
    }
})

export default therapistSchema;