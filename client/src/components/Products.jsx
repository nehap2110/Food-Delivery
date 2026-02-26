import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { ShoppingBag } from "lucide-react";

const Products = () => {
  const { addToCart, addingStates, backendUrl, food_list, isLoading } =
    useContext(AppContext);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const productCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div className="mt-16 sm:mt-24 px-4 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        variants={sectionVariants}
        whileInView="visible"
      >
        <h1 className="inline-block px-6 py-2 rounded-full text-amber-600 border border-amber-600 font-semibold uppercase text-sm tracking-wide shadow-sm">
          Popular Items
        </h1>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-950 mt-4">
          Our Popular Products
        </h2>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-xl text-amber-950">Loading products...</p>
        </div>
      ) : food_list && food_list.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {food_list.slice(0, 8).map(
            (item) =>
              item && (
                <motion.div
                  key={item._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer"
                  variants={productCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                    <img
                      src={item?.image}
                      alt={item?.name || "Product"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col items-center text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-950 mb-2">
                      {item?.name || "Product Name"}
                    </h3>
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <p className="text-amber-600 text-lg sm:text-xl font-Outfit font-bold">
                        {(item?.discount || 0).toFixed(2)}{" "}
                        <span className="text-sm font-normal">INR</span>
                      </p>
                      <p className="text-neutral-400 text-base sm:text-lg font-Outfit font-medium line-through">
                        {(item?.price || 0).toFixed(2)}{" "}
                        <span className="text-sm font-normal">INR</span>
                      </p>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        item?._id && addToCart(item);
                      }}
                      className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-full font-medium text-base shadow-md
                               hover:bg-amber-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {addingStates[item._id] ? (
                        "Adding..."
                      ) : (
                        <>
                          <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-xl text-amber-950">No products available.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Products;
