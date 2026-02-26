import React from 'react'
import { blog } from '../assets/assets'
import { motion } from 'framer-motion'

const NewsArticles = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const articleCardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
        hover: { scale: 1.02, boxShadow: "0 15px 30px rgba(0,0,0,0.1)", transition: { duration: 0.3 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, rotate: -5 },
        visible: { opacity: 1, rotate: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    return (
        <motion.div
            className='mt-16 sm:mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-20'
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className='text-center mb-12'>
                <h1 className='inline-block px-6 py-2 rounded-full text-amber-600 border border-amber-600 font-semibold uppercase text-sm tracking-wide shadow-sm'>
                    Latest Blog Post
                </h1>
                <h2 className='text-3xl sm:text-4xl font-extrabold text-amber-950 mt-4'>
                    Latest News & Articles
                </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    blog.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={articleCardVariants}
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true, amount: 0.4 }}
                            className='bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer flex flex-col'
                        >
                            <motion.img
                                variants={imageVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                src={item.img}
                                alt={item.heading}
                                className='w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110'
                            />
                            <div className='p-6 flex flex-col flex-grow'>
                                <span className='text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2'>
                                    {item.date}
                                </span>
                                <h3 className='text-xl font-bold text-amber-950 leading-tight mb-4 group-hover:text-amber-700 transition-colors duration-300'>
                                    {item.heading}
                                </h3>
                                <button className='mt-auto inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-full font-medium text-base shadow-md
                                           hover:bg-amber-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50'
                                >
                                    Read More
                                </button>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default NewsArticles