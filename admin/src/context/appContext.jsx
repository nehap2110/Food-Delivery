import axios from "axios";

import { createContext, useState, useEffect } from "react";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(true);
  const [orderData, setOrderData] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setShowSignInModal(false);
    } else {
      setShowSignInModal(true);
    }
  }, [token]);

  const handleCloseSignInModal = () => {
    setShowSignInModal(false);
  };

  useEffect(() => {
    if (token) {
      fetchOrderData();
    }
  }, [token]);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/admin/getOrders");
      if (response.data.success) {
        setOrderData(response.data.data);
      }
    } catch (error) {
      console.log("error in fetchorderData", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    setToken,
    user,
    logout,
    showSignInModal,
    setShowSignInModal,
    handleCloseSignInModal,
    orderData,
    backendUrl,
    setOrderData,
    fetchOrderData,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};
