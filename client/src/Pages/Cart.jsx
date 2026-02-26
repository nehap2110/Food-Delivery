import { Minus, Plus, X } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    clearCart,
    setCartOpen,
    cartOpen,
    totalAmount,
    setCartItems,
    removeFromCart,
    backendUrl,
    token,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevents scrolling of the main body when cart is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const goToCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  const IncreaseItem = async (product) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/add",
        { productId: product.productId._id },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData.items);
      }
    } catch (error) {
      console.log("error in increaseItem", error.message);
    }
  };

  const DecreaseItem = async (product) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/remove",
        { productId: product.productId._id },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData.items);
      }
    } catch (error) {
      console.log("error in decrease item", error.message);
    }
  };

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: "0%",
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartOpen(false)}
        >
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-amber-950">Your Cart</h2>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={clearCart}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                  disabled={cartItems.length === 0}
                >
                  <Trash2 size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hideScrollbar">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map(
                  (item) =>
                    item &&
                    item.productId && (
                      <motion.div
                        key={item._id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
                      >
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-24 h-24 object-cover rounded-md flex-shrink-0 border border-gray-200"
                        />
                        <div className="flex-grow space-y-1">
                          <h3 className="text-lg font-semibold text-amber-950">
                            {item.productId.name}
                          </h3>
                          <p className="text-amber-600 text-md sm:text-xl font-Outfit font-bold">
                            {(item.productId.discount || 0).toFixed(2)}{" "}
                            <span className="text-sm font-normal">INR</span>
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => DecreaseItem(item)}
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-200"
                            >
                              <Minus size={16} />
                            </motion.button>
                            <span className="text-gray-700 font-medium text-md">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => IncreaseItem(item)}
                              className="w-8 h-8 flex items-center justify-center rounded-full border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-200"
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </motion.div>
                    )
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-20">
                  <ShoppingBag size={64} className="mb-4 text-gray-300" />
                  <p className="text-xl font-semibold">Your cart is empty!</p>
                  <p className="text-md mt-2">
                    Add some delicious food to get started.
                  </p>
                </div>
              )}
            </div>

            {/* Cart Summary and Checkout Button */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700 text-lg">Subtotal</p>

                <p className="text-amber-950 text-md sm:text-xl font-Outfit font-bold">
                  {totalAmount.toFixed(2) || 0}{" "}
                  <span className="text-sm font-normal">INR</span>
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToCheckout}
                disabled={cartItems.length === 0}
                className={`w-full px-6 py-3 rounded-full font-semibold text-white text-lg shadow-md
                           ${
                             cartItems.length === 0
                               ? "bg-gray-400 cursor-not-allowed"
                               : "bg-amber-600 hover:bg-amber-700 transition-colors duration-300"
                           }`}
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
