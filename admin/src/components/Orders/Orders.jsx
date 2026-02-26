import React, { useContext, useState, useEffect } from "react";
import Title from "../../ui/Title";
import { appContext } from "../../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { orderData, backendUrl, fetchOrderData, token } =
    useContext(appContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!backendUrl) {
        console.error("Backend URL is not configured");
        toast.error(
          "Backend URL is not configured. Please check your environment variables."
        );
        setIsLoading(false);
        return;
      }

      if (!token) {
        console.error("No authentication token found");
        toast.error("Please log in to view orders");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log(
          "Fetching orders from:",
          backendUrl + "/api/admin/getOrders"
        );
        const response = await axios.get(backendUrl + "/api/admin/getOrders", {
          headers: { token },
        });
        console.log("Orders response:", response.data);

        if (response.data.success) {
          console.log("Orders data:", response.data.data);
        } else {
          console.error(
            "Server returned unsuccessful response:",
            response.data
          );
          toast.error(
            "Failed to fetch orders: " +
              (response.data.message || "Unknown error")
          );
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error(
          "Failed to fetch orders: " + (error.message || "Unknown error")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [backendUrl, token]);

  const statusColors = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-400/20 dark:text-yellow-200 border border-yellow-400/40",
    Preparing:
      "bg-blue-100 text-blue-800 dark:bg-blue-400/20 dark:text-blue-200 border border-blue-400/40",
    Ready:
      "bg-green-100 text-green-800 dark:bg-green-400/20 dark:text-green-200 border border-green-400/40",
    Delivered:
      "bg-gray-100 text-gray-800 dark:bg-gray-400/20 dark:text-gray-200 border border-gray-400/40",
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!token) {
      toast.error("Please log in to update order status");
      return;
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/admin/updateOrderStatus`,
        {
          orderId,
          status: newStatus,
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Status Updated");
        fetchOrderData();
      } else {
        toast.error(
          "Failed to update status: " +
            (response.data.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error(
        "Failed to update status: " + (err.message || "Unknown error")
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-2 sm:p-6 shadow-none sm:shadow-md ">
      <Title>Orders</Title>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Loading orders...
          </p>
        </div>
      ) : !token ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Please log in to view orders
          </p>
        </div>
      ) : orderData && orderData.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {orderData.map((order, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-shadow h-full bg-white dark:bg-gray-800/80 backdrop-blur-md"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      Order # {idx + 1}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Customer:{" "}
                      {`${order.address.firstName} ${order.address.lastName} `}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Address:{" "}
                      {`${order.address.city}, ${order.address.state}, ${order.address.country}`}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Time: {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex-grow">
                  <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                    Order Items:
                  </h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-gray-600 dark:text-gray-300"
                      >
                        <span>
                          {item.quantity}x {item.name}
                        </span>

                        <p>
                          {" "}
                          <span className="text-sm font-normal">₹</span>
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between font-semibold text-gray-800 dark:text-gray-100">
                    <span>Total:</span>
                    <span>₹{order.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            No orders available
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
