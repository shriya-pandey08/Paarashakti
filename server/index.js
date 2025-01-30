import { app } from "./app.js";
import { connectDB } from "./config/database.js";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

connectDB();

// PhonePe Configuration
const PHONEPE_BASE_URL = process.env.VITE_APP_PHONEPE_BASE_URL;
const MERCHANT_ID = process.env.VITE_APP_PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.VITE_APP_PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.VITE_APP_PHONEPE_SALT_INDEX;

// Payment API - Initiates PhonePe Payment
export const initiatePhonePePayment = async (amount, transactionId) => {
    const payload = {
        merchantId: MERCHANT_ID,
        transactionId: transactionId,
        amount: amount * 100, // Convert to paise
        redirectUrl: `${process.env.VITE_APP_FRONTEND_URL}/payment-success`,
        callbackUrl: `${process.env.VITE_APP_BACKEND_URL}/api/payment-status`,
        paymentInstrument: { type: "UPI_INTENT" }
    };

    // Generate checksum hash
    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const checksum = crypto.createHash("sha256").update(payloadBase64 + SALT_KEY).digest("hex");
    const finalXVerify = checksum + "###" + SALT_INDEX;

    try {
        const response = await axios.post(`${PHONEPE_BASE_URL}/pg/v1/pay`, {
            request: payloadBase64
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": finalXVerify
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Start the Express server
app.listen(process.env.VITE_APP_PORT, () => {
    console.log(`App is running on port ${process.env.VITE_APP_PORT}`);
});
