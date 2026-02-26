import React from 'react'
import { promo } from '../assets/assets'
import { motion } from 'framer-motion'

const Features = () => {
    const featureItemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    };

    const iconContainerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
    };

    return (
        <div className='mt-16 sm:mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-950 text-center mb-10">Why Choose Us?</h2>
            <div className='bg-amber-600 rounded-xl py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 justify-items-center relative overflow-hidden shadow-xl'>
                {
                    promo.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={featureItemVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, amount: 0.5 }}
                            className='text-white flex flex-col items-center text-center px-4 space-y-4'
                        >
                            <motion.div
                                variants={iconContainerVariants}
                                className='p-3 bg-white rounded-full shadow-md'
                            >
                                <img src={item.img} alt={item.heading} className='w-24 h-24 sm:w-28 sm:h-28 object-contain' />
                            </motion.div>

                            <div className='space-y-2'>
                                <h3 className='font-semibold text-2xl sm:text-3xl'>{item.heading}</h3>
                                <p className='font-medium text-base sm:text-lg opacity-90'>{item.desc}</p>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default Features