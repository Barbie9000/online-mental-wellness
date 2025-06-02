import { getModel } from "~~/server/db/models/register"

const Therapist = getModel("Therapist")
export default defineEventHandler(async () => {

    const therapists = await Therapist.find({})


    return therapists.map(t => ({
        id: t.id,
        names: `${t.personalInfo.name.first} ${t.personalInfo.name.last} ${t.personalInfo.name.other ?? ''}`,
        email: t.contactInfo.email,
        phone: t.contactInfo.phone,
        availability: t.availabilityStatus,
        yearsOfExperience: t.yearsOfExperience,
        rating: t.rating
    }))


})