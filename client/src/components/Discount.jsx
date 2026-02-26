import React from 'react'
import { assets } from "../assets/assets.js"
import { motion } from 'framer-motion'
import { MoveRight } from 'lucide-react'
const Discount = () => {
    return (
        <div className='my-24 mx-10'>
            <div className='relative bg-[#fff5ed] flex '>
                <motion.img
                    initial={{y:100,opacity:0}}
                    whileInView={{y:0,opacity:1}}
                    transition={{duration:0.6,delay:0.2}}
                    viewport={{once:true}}
                src={assets.bannerbg} alt="" className='xl:mx-44 hidden w-[50%] lg:w-1/3 sm:block ' />
                <div className='absolute hidden xl:block top-10 left-32 mx-44'>
                    <div className='relative'>
                        <motion.img
                        initial={{rotate:0}}
                        animate={{rotate:360}}
                        transition={{repeat:Infinity,repeatType:"loop",duration:5,ease:"linear"}}
                        src={assets.bannerstar} alt="" className='w-36' />
                        <p className='absolute -rotate-[30deg] left-11 top-9 text-3xl font-Outfit font-bold text-white '>80% <br /> off</p>
                    </div>
                </div>
                <div className=' my-5 lg:my-auto space-y-6 relative ms-10 xl:ms-0 '>
                    <motion.h1
                        initial={{y:-100,opacity:0}}
                        whileInView={{y:0,opacity:1}}
                        transition={{duration:0.6,delay:0.4}}
                        viewport={{once:true}}
                    className='font-Outfit font-medium text-xl md:text-3xl text-[#f29c52]'>Offer For Customer.</motion.h1>
                    <motion.p 
                        initial={{y:-100,opacity:0}}
                        whileInView={{y:0,opacity:1}}
                        transition={{duration:0.6,delay:0.2}}
                        viewport={{once:true}}
                    className='text-3xl md:text-6xl font-Outfit font-bold text-[#492d13] '>All Products <span className='underline text-[#f29c52]'>80%</span> Discount.</motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        whileHover={{ background: '#492d13' }}
                        className='text-[17px] font-medium items-center mt-10 sm:mt-4  text-white flex gap-5 bg-[#f29c52]
                      px-10 py-4 rounded-full '>Shop now <MoveRight color='white' size={25} />
                    </motion.button>
                    <img src={assets.bannershape} alt="" className='absolute
                    right-0 -top-16 w-52 md:-top-5 md:right-10' />
                    <img src={assets.bannercupcake} alt="" className='hidden lg:block absolute top-20 right-20' />
                </div>
            </div>
        </div>
    )
}

export default Discount;