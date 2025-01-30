import { Payment } from "../models/payment.model.js";
import { Appointment } from "../models/appointment.model.js";
import nodemailer from "nodemailer";
import axios from "axios";

// Placeholder for PhonePe Payment Gateway credentials
const PHONEPE_API_KEY = process.env.PHONEPE_API_KEY;
const PHONEPE_API_SECRET = process.env.PHONEPE_API_SECRET;
const PHONEPE_PAYMENT_URL = "https://api.phonepe.com/v1/payment";  // Example URL, replace with actual endpoint

// Placeholder function to create PhonePe Payment order
const createPhonePePayment = async (amount) => {
  try {
    const response = await axios.post(PHONEPE_PAYMENT_URL, {
      apiKey: PHONEPE_API_KEY,
      apiSecret: PHONEPE_API_SECRET,
      amount: amount,
      currency: "INR",
      // Add any other required parameters for PhonePe API
    });

    if (response.data.success) {
      return response.data.paymentLink; // Assuming PhonePe returns a payment link
    } else {
      throw new Error("Error creating payment order.");
    }
  } catch (error) {
    console.error("Error in creating PhonePe payment order:", error);
    throw error;
  }
};

// Checkout endpoint
export const checkout = async (req, res) => {
  try {
    const amount = 3000 * 100;  // In paise (PhonePe works in paise, 100 paise = 1 INR)
    const paymentLink = await createPhonePePayment(amount);

    res.status(200).json({
      success: true,
      paymentLink: paymentLink,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Appointment booking endpoint
export const appointment = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      address,
      date,
      time,
      preferredSlot,
      modeOfConsultation,
    } = req.body;

    const newAppointment = new Appointment({
      firstName,
      lastName,
      mobileNumber,
      email,
      address,
      date,
      time,
      preferredSlot,
      modeOfConsultation,
    });
    await newAppointment.save();
    await sendEmailToAdminWhenMakeAnAppointment(req.body);
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error while booking appointment", error: err });
  }
};

// Send email to admin when an appointment is made
export const sendEmailToAdminWhenMakeAnAppointment = async (appointmentDetails) => {
  try {
    const { firstName, lastName, mobileNumber, email, address, date, time, preferredSlot, modeOfConsultation } = appointmentDetails;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
        pass: process.env.VITE_APP_GOOGLE_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${firstName} <${email}>`,
      to: process.env.VITE_APP_USER_EMAIL_TO_SEND_EMAIL,
      subject: `Appointment Information sent by ${firstName}`,
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Mobile Number: ${mobileNumber}
        Email: ${email}
        Address: ${address}
        Date: ${date}
        Time: ${time}
        Preferred Slot: ${preferredSlot}
        Mode of Consultation: ${modeOfConsultation}
      `,
      html: `
        <h1>Appointment Information</h1>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Preferred Slot:</strong> ${preferredSlot}</p>
        <p><strong>Mode of Consultation:</strong> ${modeOfConsultation}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        throw new Error("Internal Server Error");
      } else {
        console.log("Email sent successfully!");
      }
    });
  } catch (error) {
    console.error("Something went wrong while sending email:", error);
    throw new Error("Internal Server Error");
  }
};

// Payment Verification for PhonePe (This should be based on PhonePe's verification API)
export const paymentVerification = async (req, res) => {
  try {
    const { paymentId, orderId, signature } = req.body;
    const expectedSignature = generatePhonePeSignature(paymentId, orderId); // This function should generate a valid signature

    if (expectedSignature === signature) {
      const paymentByUser = await Appointment.findOne({ phonePeOrderId: orderId });

      if (paymentByUser) {
        await Payment.create({
          paymentId,
          orderId,
          signature,
          firstName: paymentByUser.firstName,
          lastName: paymentByUser.lastName,
          mobileNumber: paymentByUser.mobileNumber,
          email: paymentByUser.email,
          address: paymentByUser.address,
          date: paymentByUser.date,
          time: paymentByUser.time,
          preferredSlot: paymentByUser.preferredSlot,
          modeOfConsultation: paymentByUser.modeOfConsultation,
        });

        if (paymentByUser?.email) {
          await sendEmailToAdminAfterSuccessfullPayment(paymentByUser, paymentId);
          await userWillgetEmailAfterSuccessfullPayment(paymentByUser, paymentId);
        }

        return res.redirect(`${process.env.VITE_HOST_URL_ENDPOINT_FOR_FRONTEND}/paymentsuccess?reference=${paymentId}`);
      } else {
        return res.status(404).json({ success: false, message: "Appointment data not found" });
      }
    } else {
      return res.status(400).json({ success: false, message: "Request not authentic" });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Generate PhonePe Signature (Placeholder, you'll need to adjust based on the PhonePe API documentation)
const generatePhonePeSignature = (paymentId, orderId) => {
  // Assuming some secret key for signature generation
  const secretKey = process.env.PHONEPE_API_SECRET;
  return crypto.createHmac("sha256", secretKey).update(paymentId + "|" + orderId).digest("hex");
};

// Send email to admin after successful payment (similar to Razorpay)
export const sendEmailToAdminAfterSuccessfullPayment = async (paymentByUser, paymentId) => {
  // Implementation as before
};

// Send email to user after successful payment (similar to Razorpay)
export const userWillgetEmailAfterSuccessfullPayment = async (paymentByUser, paymentId) => {
  // Implementation as before
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllPaymentsOfUser = async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
