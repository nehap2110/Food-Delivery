import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Reservation = () => {
    return (
        <div className=' relative '>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='bg-white px-4 py-1 md:px-8 md:py-3 rounded-full text-sm font-Outfit font-medium
                     uppercase text-[#f29c52] shadow-lg'>
                    Book reservation
                </h1>
                <h1 className=' text-2xl lg:text-6xl font-Outfit font-bold my-4 text-[#492d13]'>
                    Book Our Reservation
                </h1>
            </div>
            <div className='mt-20  '>
                <img src={assets.reservation_element} alt="" className='absolute top-0 left-0' />
                <div className=' bg-reservation bg-center bg-no-repeat flex flex-col justify-center items-center  mx-5 relative lg:mx-44 p-10'>
                    <div className='flex flex-col lg:gap-10 space-y-5 w-full '>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className='grid grid-col-1 md:grid-cols-3 gap-5   '>
                            <input type="text" placeholder='Full Name :' className='p-4  border-none outline-none outline-offset-0 rounded-lg hover:outline-dashed outline-1
                            hover:outline-[#f29c52] text-sm' />
                            <input type="text" placeholder='Phone Number :' className='p-4  border-none outline-none outline-offset-0 rounded-lg hover:outline-dashed outline-1
                            hover:outline-[#f29c52] text-sm' />
                            <input type="text" placeholder='Email Address :' className='p-4  border-none outline-none outline-offset-0  rounded-lg hover:outline-dashed outline-1
                            hover:outline-[#f29c52] text-sm' />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <textarea name="" placeholder='Additional Message..' rows={10} id="" className='w-full p-2  border-none outline-none outline-offset-0  rounded-lg hover:outline-dashed outline-1
                            hover:outline-[#f29c52] text-sm' ></textarea>
                        </motion.div>
                    </div>
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        whileHover={{ background: '#492d13', transition:{ duration:0.3} }}
                        className='text-[17px] font-medium items-center my-10 sm:mt-4  text-white flex gap-5 bg-[#f29c52]
                      px-10 py-4 rounded-full '>Book Reservation
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default Reservation