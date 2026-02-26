import React from 'react'
import { assets, chef, food_list } from '../assets/assets'
import { motion } from 'framer-motion'

const Experts = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const chefCardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            className='mt-16 sm:mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-20 relative overflow-hidden'
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* Decorative background elements */}
            <img src={assets.absolute1} alt="Decorative element" className='absolute -top-12 left-0 w-32 md:w-48 opacity-20 pointer-events-none z-0' />
            <img src={assets.absolute2} alt="Decorative element" className='absolute bottom-0 right-0 w-32 md:w-48 opacity-20 pointer-events-none z-0' />

            <div className='text-center mb-12'>
                <h1 className='inline-block px-6 py-2 rounded-full text-amber-600 border border-amber-600 font-semibold uppercase text-sm tracking-wide shadow-sm'>
                    Team Members
                </h1>
                <h2 className='text-3xl sm:text-4xl font-extrabold text-amber-950 mt-4'>
                    Our Expert Chefs
                </h2>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {chef.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={chefCardVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, amount: 0.4 }}
                        className='bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer flex flex-col items-center p-6 text-center'
                    >
                        <img
                            src={item.img}
                            alt={item.name}
                            className='w-36 h-36 object-cover rounded-full border-4 border-amber-500 mb-4 transition-transform duration-300 group-hover:scale-105'
                        />
                        <h3 className='text-xl font-bold text-amber-950 mb-1'>{item.name}</h3>
                        <p className='text-amber-600 font-semibold text-md'>{item.position}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Experts