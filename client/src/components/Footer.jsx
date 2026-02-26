import React from 'react'
import { footer } from '../assets/assets'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
    return (
        <div className=' -mt-10 md:-mt-5 absolute left-0 right-0 bg-footer bg-cover bg-center sm:bg-left'>
            <div className=' grid sm:grid-cols-2 lg:grid-cols-3 gap-10 relative py-16  justify-center items-center '>
                {
                    footer.map((item, i) => (
                        <motion.div key={i}
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.4 }}
                            viewport={{ once: false }}
                            className='text-white flex flex-col sm:flex-row mx-5 xl:mx-20 justify-center items-start sm:items-center gap-3'>
                            <div className='border-none rounded-full outline-2 outline-dashed p-2'>
                                <img src={item.img} alt="" className='border w-14 p-2 rounded-full bg-white' />
                            </div>

                            <div className='space-y-3'>
                                <h1 className='font-Outfit font-semibold text-2xl'>{item.heading}</h1>
                                <p className='font-Outfit font-medium text-lg '>{item.Heading1}</p>
                                <p className='font-Outfit font-medium text-lg '>{item.Heading2}</p>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
            <div className='bg-[#382718] text-white'>
                <hr className='h-[2px] border-none bg-white' />
                <div className='p-4 flex justify-around gap-10 items-center'>
                    <p>
                        © 2024 design and developed by DivilThakur. All rights reserved
                    </p>
                    <div className='flex gap-3'>
                        <Instagram />
                        <Twitter />
                        <Youtube />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer