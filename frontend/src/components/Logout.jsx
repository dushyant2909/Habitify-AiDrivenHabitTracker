import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice.js'; // Replace with your logout action path
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/AxiosInstance.js';

const Logout = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.get("/api/v1/user/logout");
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(logout());
                navigate('/');
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error(error.response?.data?.message)
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="">
            <button
                onClick={() => setShowConfirmation(true)}
                className="px-2 py-1 text-md font-medium text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 transition-all duration-300"
            >
                Log Out
            </button>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md shadow-lg p-6 w-96">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
                        <p className="text-gray-600 mb-6">Do you really want to log out? You will need to log in again to access your account.</p>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;