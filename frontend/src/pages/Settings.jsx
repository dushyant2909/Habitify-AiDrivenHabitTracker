import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Settings = () => {
    const { firstName, lastName, email } = useSelector((state) => state.auth.userData);
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
    });

    const toSentenceCase = (str) => {
        if (!str) return '';
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        if (firstName && lastName) {
            setUserDetails({
                fullName: toSentenceCase(`${firstName} ${lastName}`),
                email,
            });
        }
    }, [firstName, lastName, email]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-5 px-5">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg px-8 py-6">
                <h1 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
                    Account Settings
                </h1>

                <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <p className="text-gray-500 font-medium">Full Name:</p>
                        <p className="text-gray-800">{userDetails.fullName || 'Loading...'}</p>
                    </div>

                    {/* Email */}
                    <div>
                        <p className="text-gray-500 font-medium">Email:</p>
                        <p className="text-gray-800">{userDetails.email || 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
