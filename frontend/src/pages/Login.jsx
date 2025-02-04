import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login as loginUser } from "../store/slices/authSlice.js";
const BackendUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    // Toggle Password Visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Form Validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters long";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`${BackendUrl}/api/v1/user/login`, formData);
                if (response.data.success) {
                    toast.success(response.data.message);
                    dispatch(loginUser(response.data.data));
                    navigate('/');
                } else {
                    console.error("Unexpected response:", response);
                }
            } catch (error) {
                console.error(error.response?.data?.message)
                toast.error(error.response?.data?.message || "Something went wrong!");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 py-4">
                {/* Heading */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                    Please enter your credentials to log in.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        What's your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. john@gmail.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                    {/* Password Input */}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Enter password
                    </label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? (
                                <FaRegEye className="h-5 w-5 hover:text-indigo-600" />
                            ) : (
                                <FaRegEyeSlash className="h-5 w-5 hover:text-indigo-600" />
                            )}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-300 mt-4"
                    >
                        Log In
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-indigo-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
