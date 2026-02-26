"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.02, duration: 0.3 } }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="inline-block px-6 py-2 rounded-full text-amber-600 border border-amber-600 font-semibold uppercase text-sm tracking-wide shadow-sm">
          What Our Customers Say
        </h1>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-950 mt-4">
          Customer Testimonials
        </h2>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12">
        <div className="relative h-72 sm:h-80 md:h-96 w-full flex items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            {testimonials.map((testimonial, index) => (
              isActive(index) && (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    z: -100,
                    rotateY: randomRotateY(),
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    z: 0,
                    rotateY: 0,
                    zIndex: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    z: -100,
                    rotateY: randomRotateY(),
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-center"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full rounded-2xl object-cover object-center shadow-md"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between py-4 text-center lg:text-left">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mb-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-amber-950 mb-4">
              {testimonials[active].name}
            </h3>
            <motion.p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={quoteVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex justify-center lg:justify-start gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md hover:bg-amber-600 transition-colors duration-200"
            >
              <IconArrowLeft className="h-6 w-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md hover:bg-amber-600 transition-colors duration-200"
            >
              <IconArrowRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
