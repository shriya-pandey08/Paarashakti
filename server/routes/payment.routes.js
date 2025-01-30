import express from "express";
import {
  appointment,
  checkout,
  paymentVerification,
  getAppointments,
  getAllPaymentsOfUser,
} from "../controllers/payment.controller.js";

const router = express.Router();

// Home route
router.get("/", (req, res) => {
  res.send("Welcome to Home page");
});

// Checkout route - initiate payment using phone number
router.route("/checkout").post((req, res) => {
  const { phone, amount } = req.body;  // assuming `phone` and `amount` are passed in the body
  if (!phone || !amount) {
    return res.status(400).json({ message: "Phone and amount are required." });
  }

  // Call checkout controller logic (assuming checkout logic handles phone-based payments)
  checkout(phone, amount, res);
});

// Appointment routes
router.get("/appointment", (req, res) => {
  res.send("Welcome to appointment page");
});
router.route("/appointment").post(appointment);

// Payment verification route
router.route("/paymentverification").post((req, res) => {
  const { phone, transactionId } = req.body;  // assuming phone and transactionId are passed
  if (!phone || !transactionId) {
    return res.status(400).json({ message: "Phone number and transaction ID are required." });
  }

  // Call payment verification controller with phone number
  paymentVerification(phone, transactionId, res);
});

// Fetch all appointments for users
router.get("/all-appointment-of-users", getAppointments);

// Get all payments for users, possibly filtered by phone or user ID
router.get("/get-all-payments-of-users", getAllPaymentsOfUser);

export default router;
