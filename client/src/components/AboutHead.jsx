import React from 'react';
import { assets } from '../assets/assets';
import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutHead = () => {
    const navigate = useNavigate();

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.4 } },
        hover: { scale: 1.05, backgroundColor: '#492d13', transition: { duration: 0.3 } },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            className='mt-16 sm:mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 md:py-20'
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className='flex flex-col md:flex-row items-center gap-8 lg:gap-12'>
                {/* Left Section - Image */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className='flex-1 flex justify-center p-4 relative'
                >
                    <img
                        src={assets.aboutimg3}
                        alt="About Us"
                        className='max-w-full h-auto object-contain rounded-xl shadow-lg border border-gray-100 transform rotate-2'
                    />
                </motion.div>

                {/* Right Section - Text Content */}
                <div className='flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4 lg:space-y-6'>
                    <motion.h1
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className='inline-block px-6 py-2 rounded-full text-amber-600 border border-amber-600 font-semibold uppercase text-sm tracking-wide shadow-sm mb-2'
                    >
                        About Us
                    </motion.h1>
                    <motion.h2
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ ...textVariants.visible.transition, delay: 0.1 }}
                        viewport={{ once: true }}
                        className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-amber-950 leading-tight'
                    >
                        We provide 100% halal bakery products.
                    </motion.h2>
                    <div className='space-y-4 text-gray-700 leading-relaxed'>
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ ...textVariants.visible.transition, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Netus et malesuada fames ac turpis. Rhoncus urna neque viverra justo nec ultrices. Donec enim diam vulputate ut pharetra sit amet aliquam. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Congue eu consequat ac felis donec et odio. Cursus turpis massa tincidunt dui ut ornare lectus sit. Facilisi cras fermentum odio eu feugiat. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Erat velit scelerisque in dictum. Sit amet est placerat in.
                        </motion.p>
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ ...textVariants.visible.transition, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            Netus et malesuada fames ac turpis. Rhoncus urna neque viverra justo nec ultrices. Donec enim diam vulputate ut pharetra sit amet aliquam. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Congue eu consequat ac felis donec et odio.
                        </motion.p>
                    </div>
                    <motion.button
                        variants={buttonVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => navigate("/contact")}
                        className='mt-6 inline-flex items-center px-8 py-4 bg-amber-600 text-white rounded-full text-lg font-semibold shadow-lg
                                   hover:bg-amber-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50'
                    >
                        Contact Us <MoveRight className='ml-3 w-5 h-5' />
                    </motion.button>
                </div>
            </div>

            {/* Mission and Vision */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16 sm:mt-24'>
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className='bg-white p-8 rounded-xl shadow-lg border border-gray-100'
                >
                    <h3 className='text-3xl font-bold text-amber-950 mb-4'>Our Mission</h3>
                    <p className='text-gray-700 leading-relaxed'>
                        Netus et malesuada fames ac turpis. Rhoncus urna neque viverra justo nec ultrices. Donec enim diam vulputate ut pharetra sit amet aliquam. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Congue eu consequat ac felis donec et odio. Cursus turpis massa tincidunt dui ut ornare lectus sit. Facilisi cras fermentum odio eu feugiat.
                    </p>
                </motion.div>
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ ...sectionVariants.visible.transition, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className='bg-white p-8 rounded-xl shadow-lg border border-gray-100'
                >
                    <h3 className='text-3xl font-bold text-amber-950 mb-4'>Our Vision</h3>
                    <p className='text-gray-700 leading-relaxed'>
                        Netus et malesuada fames ac turpis. Rhoncus urna neque viverra justo nec ultrices. Donec enim diam vulputate ut pharetra sit amet aliquam. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Congue eu consequat ac felis donec et odio. Cursus turpis massa tincidunt dui ut ornare lectus sit. Facilisi cras fermentum odio eu feugiat.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutHead;