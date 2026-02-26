import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const DynamicBg = ({ title }) => {
    const titleVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const breadcrumbVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
    };

    return (
        <div className='relative bg-gradient-to-br from-[#fff5ed] to-white min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden'>
            {/* Background elements, potentially food-related icons or subtle patterns */}
            <div className='absolute inset-0 z-0 opacity-20'>
                {/* Example: You could add background images here using absolute positioning and appropriate z-index */}
                {/* <img src={assets.some_bg_pattern} alt="background pattern" className="absolute top-0 left-0 w-full h-full object-cover" /> */}
            </div>

            <div className='relative z-10 text-center'>
                <motion.h1
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className='font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-amber-950 mb-4 tracking-tight leading-none'
                >
                    {title}
                </motion.h1>
                <motion.div
                    variants={breadcrumbVariants}
                    initial="hidden"
                    animate="visible"
                    className='mt-8 inline-block bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg font-medium text-lg'
                >
                    <Link to="/" className='hover:underline transition-colors duration-200'>
                        Home
                    </Link>
                    <span className='mx-2 opacity-75'>/</span>
                    <span>{title}</span>
                </motion.div>
            </div>
        </div>
    )
}

export default DynamicBg