import React, { useContext, useEffect, useState } from 'react'
import { category, menu_list, promo } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Categories = () => {

   const {categorise} = useContext(AppContext);
    const navigate = useNavigate();

    const goToMenu = (category) =>{
        navigate('/menu');
        window.scrollTo(0,0);
        categorise(category);
    }

    return (
        <div className='mt-20'>
            <motion.div
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center items-center 
             lg:mx-48  p-2'>
                {
                    menu_list.map((item, i) => (
                        <motion.div key={i} onClick={()=>goToMenu(item.menu_name)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1, }}
                            transition={{ duration: 0.4, delay: 0.1}}
                            whileHover={{scale:1.1, transition:{duration:0.2}}}
                            viewport={{once:false}}
                            className='flex flex-col justify-center items-center p-2  '>
                            <motion.img  
                                whileHover={{border:"3px solid #f29c52"}}
                                transition={{duration: 0.3, delay: 0.1}}
                            src={item.menu_image} alt="" className='p-1 rounded-full border-[3px] border-transparent ' />
                            <p className='font-Outfit font-semibold text-xl mt-2 '>{item.menu_name}</p>
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    )
}

export default Categories