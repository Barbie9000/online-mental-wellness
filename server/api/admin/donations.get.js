import { getModel } from "~~/server/db/models/register"

const Donation = getModel("Donation")
export default defineEventHandler(async () => {

    const donations = await Donation.find({}).populate({
        path: 'patient',
        select: 'personalInfo.name.first'
    })


    return donations.map(d => ({
        donatedBy: `${d.patient?.personalInfo?.name?.first ?? '[Anonymous]'}`,
        amount: d.amount,
        currency: d.currency,
        at: formatDate(d.createdAt),
    }))


})