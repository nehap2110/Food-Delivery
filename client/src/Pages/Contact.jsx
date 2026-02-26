import React, { useEffect, useState } from 'react'
import DynamicBg from '../components/DynamicBg'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const onChaneHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  const handleSendMessage = (e) => {
    e.preventDefault();
    toast.success("Message Sent")
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DynamicBg title={"Contact Us"} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16'>
          <motion.div 
            className='flex-1 relative'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="sticky top-24">
              <motion.img
                src={assets.map}
                alt="Location Map"
                className='w-full h-auto rounded-2xl shadow-xl'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleSendMessage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className='flex-1 bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg'
          >
            <div className="space-y-6">
              <div>
                <span className='inline-block px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-sm font-medium tracking-wide mb-4'>
                  Get in Touch
                </span>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-amber-950 leading-tight'>
                  How can we help you?
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={onChaneHandler}
                    value={formData.fullName}
                    placeholder='John Doe'
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 text-gray-700 placeholder-gray-400'
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name='email'
                    onChange={onChaneHandler}
                    value={formData.email}
                    placeholder='john@example.com'
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 text-gray-700 placeholder-gray-400'
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    required
                    type="tel"
                    id="phone"
                    name='phone'
                    onChange={onChaneHandler}
                    value={formData.phone}
                    placeholder='+1 (555) 000-0000'
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 text-gray-700 placeholder-gray-400'
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    required
                    type="text"
                    id="subject"
                    name='subject'
                    onChange={onChaneHandler}
                    value={formData.subject}
                    placeholder='How can we help?'
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 text-gray-700 placeholder-gray-400'
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    onChange={onChaneHandler}
                    value={formData.message}
                    placeholder='Write your message here...'
                    rows="6"
                    className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 text-gray-700 placeholder-gray-400 resize-none'
                  ></textarea>
                </div>
              </div>

              <button
                type='submit'
                className='w-full sm:w-auto px-8 py-4 bg-amber-600 text-white font-semibold rounded-full
                hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                transform hover:scale-[1.02] active:scale-[0.98]'
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

export default Contact