require("dotenv").config();
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PHONEPE_BASE_URL = process.env.PHONEPE_BASE_URL;
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;

// Payment API - Initiates a PhonePe transaction
app.post("/pay", async (req, res) => {
    const { amount, email } = req.body;

    const payload = {
        merchantId: MERCHANT_ID,
        transactionId: "T" + Date.now(),
        amount: amount * 100, // Convert to paise
        redirectUrl: "https://yourwebsite.com/payment-success",
        callbackUrl: "https://yourwebsite.com/api/payment-status",
        paymentInstrument: {
            type: "UPI_INTENT"
        }
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

        if (response.data.success) {
            res.json({ success: true, redirectUrl: response.data.data.instrumentResponse.redirectInfo.url });
        } else {
            res.status(400).json({ success: false, message: response.data.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Verify Payment Status
app.get("/payment-status/:transactionId", async (req, res) => {
    const transactionId = req.params.transactionId;
    const url = `${PHONEPE_BASE_URL}/pg/v1/status/${MERCHANT_ID}/${transactionId}`;
    
    const checksum = crypto.createHash("sha256").update(url + SALT_KEY).digest("hex");
    const finalXVerify = checksum + "###" + SALT_INDEX;

    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": finalXVerify
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Nodemailer - Send confirmation email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/send-email", async (req, res) => {
    const { email, amount } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Payment Confirmation",
        text: `Your payment of ₹${amount} has been successfully processed.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Email sent successfully." });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
