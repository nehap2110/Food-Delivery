import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import axios from 'axios'

const Login = () => {
    const { setShowLogin, showLogin, backendUrl, setToken } = useContext(AppContext);
    const [formType, setFormType] = useState("Log In");
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        // Prevent scrolling of the main body when login modal is open
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === "name" && /\d/.test(value)) {
            toast.error("Name cannot contain numbers");
            return;
        }
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let newUrl = backendUrl;

        try {
            if (formType === "Log In") {
                newUrl += "/api/user/login";
            } else {
                newUrl += "/api/user/register";
            }

            const { data } = await axios.post(newUrl, formData);

            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.user);
                setShowLogin(false);
                toast.success(data.message);
                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    };

    const formVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 150, damping: 20 } },
        exit: { y: "100%", opacity: 0, transition: { type: "spring", stiffness: 150, damping: 20 } },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };

    return (
        <AnimatePresence>
            {showLogin && (
                <motion.div
                    className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 p-4'
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => setShowLogin(false)} // Close when clicking outside
                >
                    <motion.form
                        onSubmit={handleFormSubmit}
                        className='bg-white rounded-xl shadow-2xl p-8 md:p-10 relative flex flex-col w-full max-w-sm sm:max-w-md'
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowLogin(false)}
                            className='absolute top-4 right-4 p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200'
                        >
                            <X size={24} />
                        </motion.button>

                        <h2 className='text-3xl font-bold text-amber-950 mb-6 text-center'>
                            {formType === "Log In" ? "Login" : "Register"}
                        </h2>

                        <div className='flex gap-4 mb-8 justify-center'>
                            <button
                                type="button"
                                onClick={() => setFormType("Log In")}
                                className={`text-xl font-semibold pb-1 transition-colors duration-200
                                            ${formType === "Log In" ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-700 hover:text-amber-600"}`}
                            >
                                Login
                            </button>
                            <span className='text-xl text-gray-400'>/</span>
                            <button
                                type="button"
                                onClick={() => setFormType("Register")}
                                className={`text-xl font-semibold pb-1 transition-colors duration-200
                                            ${formType === "Register" ? "text-amber-600 border-b-2 border-amber-600" : "text-gray-700 hover:text-amber-600"}`}
                            >
                                Register
                            </button>
                        </div>

                        <div className='flex flex-col gap-5 mb-6'>
                            {formType === "Register" && (
                                <motion.input
                                    variants={inputVariants}
                                    initial="hidden"
                                    animate="visible"
                                    type="text"
                                    value={formData.name}
                                    name='name'
                                    onChange={onChangeHandler}
                                    placeholder='Full name'
                                    className='p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300'
                                    disabled={isLoading}
                                />
                            )}
                            <motion.input
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...inputVariants.visible.transition, delay: formType === "Register" ? 0.1 : 0 }}
                                type="email"
                                value={formData.email}
                                name='email'
                                onChange={onChangeHandler}
                                placeholder='Email address'
                                className='p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300'
                                disabled={isLoading}
                            />
                            <motion.input
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ ...inputVariants.visible.transition, delay: formType === "Register" ? 0.2 : 0.1 }}
                                type="password"
                                value={formData.password}
                                name='password'
                                onChange={onChangeHandler}
                                placeholder='Password'
                                className='p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-base text-gray-700 placeholder-gray-500 transition-all duration-300'
                                disabled={isLoading}
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                            className='w-full px-6 py-3 bg-amber-600 text-white rounded-lg font-medium text-lg shadow-md
                                       hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                formType === "Log In" ? "Login" : "Register"
                            )}
                        </motion.button>
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Login