import { getModel } from "~~/server/db/models/register";

const Donation = getModel('Donation');

// Manual timestamp generation (YmdHMS format)
const generateTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

// Generate M-Pesa password
const generatePassword = (shortCode, passkey, timestamp) => {
    const passString = shortCode + passkey + timestamp;
    return Buffer.from(passString).toString("base64");
};

// Get M-Pesa access token
async function getAccessToken() {
    const config = useRuntimeConfig();
    const consumerKey = config.mpesa.CONSUMERKEY;
    const consumerSecret = config.mpesa.CONSUMERSECRET;
    const authUrl = config.mpesa.AUTH_URL;

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`, "utf-8").toString("base64");

    const Authorization = `Basic ${credentials}`;

    try {
        const response = await $fetch(authUrl, {
            headers: {
                'Authorization': Authorization,
            },
        });

        return response.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to get M-Pesa access token'
        });
    }
}

// Initiate STK Push
async function initiateSTKPush(phoneNumber) {
    const config = useRuntimeConfig();
    const shortCode = config.mpesa.SHORTCODE;
    const passkey = config.mpesa.PASSKEY;
    const stkUrl = config.mpesa.STK_URL;
    const callBackURL = config.mpesa.CALLBACKURL;

    const timestamp = generateTimestamp();
    const password = generatePassword(shortCode, passkey, timestamp);

    try {
        const accessToken = await getAccessToken();

        const payload = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: 1, //fort test purposes
            PartyA: phoneNumber,
            PartyB: shortCode,
            PhoneNumber: phoneNumber,
            CallBackURL: callBackURL,
            AccountReference: "BetterMind Wellness",
            TransactionDesc: "Medical Donation"
        };

        const response = await $fetch(stkUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: payload
        });

        return response;
    } catch (error) {
        console.error('STK Push error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to initiate M-Pesa payment'
        });
    }
}

export default defineEventHandler(async (event) => {


    const user = event.context.user;

    let donation;

    try {
        // Validate request body
        const body = await readAndValidateBody(event, { include: ['amount', 'phoneNumber'] });
        const { amount, phoneNumber } = body;

        if (!/^254\d{9}$/.test(phoneNumber)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Valid phone number in format 254XXXXXXXXX is required'
            });
        }

        
        donation = new Donation({
            amount: parseFloat(amount),
            phoneNumber,
            status: 'initialized',
            ...(user ? { patient: user._id } : {})
        });

        // Initiate STK Push
        const stkResponse = await initiateSTKPush(phoneNumber);

        // Update donation with STK response details
        donation.checkoutRequestID = stkResponse.CheckoutRequestID;

        return {
            success: true,
            message: 'STK Push initiated successfully',
            data: {
                donationId: donation._id,
                checkoutRequestId: stkResponse.CheckoutRequestID,
                responseDescription: stkResponse.ResponseDescription
            }
        };

    } catch (error) {
        console.error('Donation STK Push error:', error);

        // If it's already a createError, throw it as is
        if (error.statusCode) {
            throw error;
        }

        // Generic error response
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error occurred'
        });
    } finally {
        await donation?.save()
    }
});