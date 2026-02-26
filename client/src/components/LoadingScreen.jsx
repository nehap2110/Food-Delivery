import React from 'react';
import { motion } from 'framer-motion';
import brandLogo from '../assets/brandLogo.png';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Existing background animation (adjusted for bottom-right appearance) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[100vw] h-[100vw] bg-gradient-to-br from-[#492d13]/5 via-[#f29c52]/5 to-transparent"
        />
        
        {/* New top-left background animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[100vw] h-[100vw] bg-gradient-to-tl from-[#f29c52]/5 via-[#492d13]/5 to-transparent"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-[#f29c52]/20 blur-2xl rounded-full"
          />
          <motion.img
            src={brandLogo}
            alt="Brand Logo"
            className="relative w-40 h-40 object-contain"
          />
        </motion.div>

        {/* Loading Animation */}
        <div className="mt-12 flex flex-col items-center">
          {/* Progress Bar Container */}
          <div className="relative w-72 h-[3px] bg-white/10 rounded-full overflow-hidden">
            {/* Progress Bar */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 bg-[#f29c52]"
            >
              {/* Shine Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-white/80 text-sm tracking-[0.2em] uppercase flex items-center gap-2"
            >
              <span>Loading</span>
              <span className="inline-block animate-pulse">•</span>
              <span className="inline-block animate-pulse delay-100">•</span>
              <span className="inline-block animate-pulse delay-200">•</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#f29c52]/30 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 