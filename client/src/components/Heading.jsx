import React from "react";
import { assets } from "../assets/assets";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Heading = () => {
  const navigate = useNavigate();

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.4 },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#492d13",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
    },
  };

  return (
    <div className="relative bg-[#fff5ed] overflow-hidden min-h-[calc(100vh-64px)] flex items-center py-12 md:py-20 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center justify-between w-full h-full">
        {/* Left Section - Text Content */}
        <motion.img
          initial={{ rotate: 360, opacity: 0.5 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          src={assets.hero_wave}
          alt=""
          className="absolute left-1/2 z-0 hidden lg:block"
        />
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 py-8 md:py-0 relative z-10 space-y-4 lg:space-y-6">
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-amber-600 tracking-wider uppercase"
          >
            Get 80% discount
          </motion.h1>
          <motion.h2
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...textVariants.visible.transition, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-amber-950"
          >
            Order In, Enjoy Fresh
          </motion.h2>
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate("/menu")}
            className="mt-6 inline-flex items-center px-8 py-4 bg-amber-600 text-white rounded-full text-lg font-semibold shadow-lg
                                   hover:bg-amber-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50"
          >
            Shop now <MoveRight className="ml-3 w-5 h-5" />
          </motion.button>
        </div>

        {/* Right Section - Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex items-center justify-center md:justify-end p-4 lg:p-8"
        >
          <img
            src={assets.hero_image}
            alt="Delicious Food"
            className="max-w-full h-auto object-contain md:max-h-[350px] lg:max-h-[450px] w-full lg:w-auto transform rotate-3 scale-105"
          />
        </motion.div>

        {/* Decorative Wave Image */}
        <motion.img
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 0.2 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          src={assets.hero_wave}
          alt="Wave Background"
          className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none hidden md:block"
        />
      </div>
    </div>
  );
};

export default Heading;
