import { Schema } from "mongoose"

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    auth: {
        role: {
            type: String,
            default: 'admin',
            immutable: true
        },
        password: {
            type: String,
            required: true
        }
    }
})
export default adminSchema;