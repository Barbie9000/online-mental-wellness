import { getModel } from "~~/server/db/models/register"

const Donation = getModel('Donation');

export default defineEventHandler(async event => {
    const status = req.body.Body.stkCallback.ResultCode;
    console.log(status);

    let message;
    
    //check if payment was successful or not
    if (status <= 0) {
        message = {
            ResponseCode: status,
            ResponseDesc: "success",
        };

        //storing the payers details from the callBack
        const paidDetails = req.body.Body.stkCallback.CallbackMetadata.Item;

        const mpesaTransaction = {
            transationDate: paidDetails[3].Value,
            mpesaReceiptNumber: paidDetails[1].Value,
            checkoutRequestID: req.body.Body.stkCallback.CheckoutRequestID
        };

        await Donation.findOneAndUpdate({ checkoutRequestID: mpesaTransaction.checkoutRequestID }, {
            status: 'processed',
            trnxID: mpesaTransaction.mpesaReceiptNumber,
            completedAt: mpesaTransaction.transationDate
        })

    } else {
        message = {
            ResponseCode: status,
            ResponseDesc: "fail",
        };
    }
})
