import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    phonepe_order_id: {
      type: String,
      required: true, // Order ID from PhonePe after order creation
    },
    phonepe_payment_id: {
      type: String,
      required: true, // Payment ID after successful payment from PhonePe
    },
    phonepe_signature: {
      type: String,
      required: true, // Signature for validating payment from PhonePe
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,  // Changed to String to handle international numbers and special characters
      required: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    preferredSlot: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
    modeOfConsultation: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    transactionAmount: {  // Field to store the payment amount
      type: Number,
      required: true,
    },
    paymentStatus: {  // Field to track payment status
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    currentDate: {
      type: Date,
      default: Date.now,
    },
    currentTime: {
      type: String,
      default: new Date().toLocaleTimeString(),
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
