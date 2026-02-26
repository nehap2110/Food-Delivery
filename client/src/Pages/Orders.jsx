import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import DynamicBg from "../components/DynamicBg";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const Orders = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);
  const [isTracking, setIsTracking] = useState(false);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "prepared":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ready":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/order/getOrders", {
        headers: { token },
      });
      if (response.data.success) {
        setOrderData(response.data.data);
      }
    } catch (error) {
      console.log("error in fetchorderData", error.message);
    }
  };

  const handleTrackOrders = async () => {
    setIsTracking(true);
    try {
      const response = await axios.get(backendUrl + "/api/order/getOrders", {
        headers: { token },
      });
      if (response.data.success) {
        setOrderData(response.data.data);
      }
    } catch (error) {
      console.log("error in tracking orders", error.message);
    } finally {
      setIsTracking(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchOrderData();
  }, [token]);

  return (
    <div>
      <DynamicBg title={"Orders"} />
      <div className="min-h-[60vh] flex flex-col items-center py-16 md:py-24 lg:py-32 px-4 sm:px-8 lg:px-20">
        {orderData.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full mt-10 md:mt-20">
            <img
              src={assets.empty_cart_icon}
              alt="No orders"
              className="w-24 h-24 md:w-32 md:h-32 mb-6 opacity-70"
            />
            <p className="text-3xl md:text-4xl text-amber-950 font-Outfit font-semibold mb-4">
              No orders yet!
            </p>
            <p className="text-lg text-gray-600 font-Outfit">
              Looks like you haven't placed any orders. Start exploring our
              delicious food!
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-end mb-8">
              <button
                onClick={handleTrackOrders}
                disabled={isTracking}
                className="px-8 py-3 rounded-full bg-amber-600 text-white font-Outfit font-semibold text-lg
                hover:bg-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              >
                {isTracking ? "Updating..." : "Track All Orders"}
              </button>
            </div>
            <div className="w-full max-w-6xl space-y-8">
              {orderData.map((order, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 space-y-4 md:space-y-0 md:space-x-6"
                >
                  <img
                    src={assets.parcelicon}
                    alt="Parcel Icon"
                    className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col md:flex-row items-center w-full md:space-x-6 space-y-4 md:space-y-0">
                    <div className="flex-1 text-center md:text-left font-Outfit font-normal text-base text-gray-800">
                      <p className="font-medium text-amber-900 mb-1">
                        Items Ordered:
                      </p>
                      {order?.items?.map((item, i) => (
                        <span key={i} className="block md:inline-block">
                          {`${item?.name || "Unknown"} x ${
                            item?.quantity || 0
                          }`}
                          {i < order.items.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <p className="text-amber-950 text-md sm:text-xl font-Outfit font-bold">
                      <span className="text-sm font-normal">INR </span>
                      {order?.amount?.toFixed(2) || 0}{" "}
                    </p>
                    <p className="text-lg font-Outfit font-medium text-gray-700 text-center md:text-right w-full md:w-auto">
                      Quantity: {order?.items?.length || 0}
                    </p>
                  </div>
                  <div className="font-Outfit font-semibold text-base text-center md:text-right w-full md:w-auto mt-4 md:mt-0">
                    <span
                      className={`px-4 py-2 rounded-full border ${getStatusStyle(
                        order?.status || ""
                      )}`}
                    >
                      {order?.status || "Unknown"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
