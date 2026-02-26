import React, { useContext, useEffect, useState } from "react";
import DynamicBg from "../components/DynamicBg";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = () => {
  const navigate = useNavigate();
  const { totalAmount, cartItems, backendUrl, token, clearCart } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const deliveryFee = 29;
  const finalAmount = totalAmount + deliveryFee;

  useEffect(() => {
    console.log(finalAmount);
  }, [finalAmount]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const simplifiedItems =
      cartItems?.map((item) => ({
        name: item?.productId?.name || "Unknown Product",
        price: item?.productId?.discount || 0,
        quantity: item?.quantity || 0,
      })) || [];

    const orderData = {
      items: simplifiedItems,
      amount: finalAmount,
      address: formData,
    };

    try {
      let response = await axios.post(
        backendUrl + "/api/order/placeOrder",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        const razorpayOrder = response.data.order;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: finalAmount * 100,
          currency: "INR",
          name: "SnackDash",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (paymentResponse) {
            await verifyPayment(paymentResponse, response.data.orderData);
          },
          prefill: {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#F37254",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order", error.message);
      toast.error("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const verifyPayment = async (paymentResponse, orderData) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/verifyPayment",
        {
          paymentId: paymentResponse.razorpay_payment_id,
          orderId: paymentResponse.razorpay_order_id,
          signature: paymentResponse.razorpay_signature,
          orderData: orderData,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Payment Successful!");
        clearCart();
        navigate("/orders");
      } else {
        toast.error("Payment verification failed!");
      }
    } catch (error) {
      console.error("Error verifying payment", error);
      toast.error("Payment verification failed!");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div>
      <DynamicBg title={"Checkout"} />
      <motion.form
        onSubmit={handleFormSubmit}
        className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Delivery Information */}
        <div className="flex-1 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h1 className="text-3xl font-bold text-amber-950 mb-8 text-center">
            Delivery Information
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.input
              variants={inputVariants}
              type="text"
              onChange={onChangeHandler}
              value={formData.firstName}
              placeholder="First name"
              name="firstName"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.1 }}
              type="text"
              onChange={onChangeHandler}
              value={formData.lastName}
              placeholder="Last name"
              name="lastName"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.2 }}
              type="email"
              onChange={onChangeHandler}
              value={formData.email}
              placeholder="Email address"
              name="email"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300 col-span-full"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.3 }}
              type="text"
              onChange={onChangeHandler}
              value={formData.street}
              placeholder="Street"
              name="street"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300 col-span-full"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.4 }}
              type="text"
              onChange={onChangeHandler}
              value={formData.city}
              placeholder="City"
              name="city"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.5 }}
              type="text"
              onChange={onChangeHandler}
              value={formData.state}
              placeholder="State"
              name="state"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.6 }}
              type="text"
              onChange={onChangeHandler}
              value={formData.zipCode}
              placeholder="Zip code"
              name="zipCode"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.7 }}
              type="text"
              onChange={onChangeHandler}
              value={formData.country}
              placeholder="Country"
              name="country"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300"
            />
            <motion.input
              variants={inputVariants}
              transition={{ ...inputVariants.visible.transition, delay: 0.8 }}
              type="tel"
              onChange={onChangeHandler}
              value={formData.phone}
              placeholder="Phone number"
              name="phone"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300 col-span-full"
            />
          </div>
        </div>

        {/* Order Summary */}
        <motion.div
          variants={summaryVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-2/5 bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-amber-950 mb-8 text-center">
              Order Summary
            </h1>
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-amber-950 text-md sm:text-xl font-Outfit font-bold">
                  {totalAmount.toFixed(2) || 0}{" "}
                  <span className="text-sm font-normal">INR</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p className="text-amber-950 text-md sm:text-xl font-Outfit font-bold">
                  {deliveryFee.toFixed(2) || 0}{" "}
                  <span className="text-sm font-normal">INR</span>
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-bold text-amber-950">
                <p>Total</p>
                <p className="text-amber-950 text-md sm:text-xl font-Outfit font-bold">
                  {finalAmount.toFixed(2) || 0}{" "}
                  <span className="text-sm font-normal">INR</span>
                </p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={cartItems.length === 0 || loading}
            className={`w-full mt-8 px-6 py-3 rounded-full font-semibold text-white text-lg shadow-md
                       ${
                         cartItems.length === 0 || loading
                           ? "bg-gray-400 cursor-not-allowed"
                           : "bg-amber-600 hover:bg-amber-700 transition-colors duration-300"
                       }`}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Checkout;
