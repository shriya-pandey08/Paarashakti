import React, { useState } from "react";
import axios from "axios";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import Footer from "../components/Footer";
import banner3 from "../images/sliderImages/bg.jpg";
import * as Yup from "yup";
import { LuLoader2 } from "react-icons/lu";

const Appointment = () => {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const initialFormValue = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    address: "",
    date: new Date().toISOString().substr(0, 10),
    time: getCurrentTime(),
    preferredSlot: "morning",
    modeOfConsultation: "online",
  };

  const [formData, setFormData] = useState(initialFormValue);
  const [loading, setLoading] = useState(false);
  const [userDataFromPayment, setUserDataFromPayment] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkoutHandler = async (e, formData) => {
    e.preventDefault();
    const { firstName, lastName, mobileNumber, address } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !mobileNumber.trim() ||
      !address.trim()
    ) {
      alert("Please fill all the details.");
      return;
    }
    if (mobileNumber.trim().length !== 10) {
      alert("Please enter 10 digit mobile number ");
      return;
    }
    if (firstName.trim().length < 3) {
      alert("Please enter your name properly");
      return;
    }
    if (lastName.trim().length < 3) {
      alert("Please enter your last name properly ");
      return;
    }

    setLoading(true);

    const orderData = {
      firstName,
      lastName,
      mobileNumber,
      address,
      date: formData.date,
      time: formData.time,
      preferredSlot: formData.preferredSlot,
      modeOfConsultation: formData.modeOfConsultation,
    };

    // Get the payment link from PhonePe API
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST_URL_ENDPOINT}/api/paymentlink`,
        orderData
      );

      const paymentLink = data.paymentLink; // Assume the response contains a payment link.

      // After receiving the payment link, open the PhonePe page (you can handle the redirect or integration as needed)
      window.location.href = paymentLink;

      // After completing the payment, save the user data
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL_ENDPOINT}/api/appointment`,
        {
          ...orderData,
          razorpay_order_id: data.paymentId,
        }
      );

      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Error during checkout:", error.message);
      alert("There was an error while processing the payment.");
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="hidden md:block">
        <TopNavbar />
      </div>
      <div className="bg-black h-[70px]">
        <BottomNavbar className="text-black" />
      </div>
      <div className="w-full">
        <img
          src={banner3}
          alt="banner image"
          className="h-[50vh] object-cover w-full"
        />
      </div>
      <div className="grid md:flex lg:flex m-auto mb-7 font-sans w-[90%] gap-4">
        <div className="m-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mt-7 font-semibold mb-4 font-philosopher text-center">
            Book an Appointment
          </h2>
          <h3 className="text-[13px] italic font-sans md:text-[16px] lg:text-[18px] text-gray-500 mb-3">
            Unlock Solutions, Embrace Serenity.
          </h3>
          <div>
            <p>
              In years of practicing astrology, I've discovered a profound truth
              - every problem is a lock with a key. Whether it's delving into
              horoscopes, tarot, or palmistry, I provide seekers with remedies,
              unlocking doors to happiness and goals.
            </p>
            <p>
              Life becomes precious, and the lessons learned are cherished for
              good. Find solutions, feel sorted, and embrace the journey towards
              a fulfilled life.
            </p>
          </div>
        </div>
        <div className="px-4 m-auto md:px-0 py-8 max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl mt-7 font-semibold mb-4 font-philosopher text-center">
            Appointment Form
          </h1>
          <form
            onSubmit={(e) => checkoutHandler(e, formData)}
            className="bg-white font-poppins shadow-md rounded px-3 pt-6 pb-8 mb-4 space-y-4 border border-blue-300"
          >
            <input
              type="text"
              placeholder={`First Name*`}
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              autoComplete="off"
              className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name*"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              autoComplete="off"
              className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
            <input
              type="number"
              placeholder="Mobile Number*"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              autoComplete="off"
              className="shadow appearance-none border rounded border-blue-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              className="shadow appearance-none border rounded border-blue-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
            <textarea
              type="text"
              placeholder="Full Address*"
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleInputChange}
              autoComplete="off"
              className="shadow appearance-none border rounded border-blue-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            />
            {/* Date & Time selection */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                placeholder="Select Date here*"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                min={currentDate}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              <input
                type="time"
                placeholder="Select Time here*"
                name="time"
                required
                value={formData.time}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            {/* preferredSlot & modeOfConsultation selection */}
            <div className="grid grid-cols-2 gap-4">
              <select
                name="preferredSlot"
                value={formData.preferredSlot}
                onChange={handleInputChange}
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              <select
                name="modeOfConsultation"
                value={formData.modeOfConsultation}
                onChange={handleInputChange}
                className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 mt-6 bg-blue-500 text-white rounded-full"
              >
                {loading ? (
                  <LuLoader2 className="animate-spin mx-auto" size={20} />
                ) : (
                  "Book Appointment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Appointment;
