import mongoose from "mongoose";

export async function setupAdmin() {

    const adminExists = (await mongoose.model('Admin').countDocuments({})) > 0;

    if (adminExists) {
        return {
            message: "Admin already exists"
        }
    }

    const email = "admin@gmail.com"
    const plainPassword = "password"
    const admin = await mongoose.model('Admin').create({
        email,
        auth: {
            password: await hashPassword(plainPassword)
        }
    })

    return {
        message: `Created admin successfully
         To Login use "${admin.email}" as email, "${plainPassword} as password `
    }
}