import React, { useEffect, useState } from 'react';
import gifImage from '../../assets/empty_habits_page_gif.gif';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
const BackendUrl = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
    const [habits, setHabits] = useState([]);

    const getHabits = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/api/v1/habit`);
            if (response.data.data.length === 0) {
                setHabits([]);
            } else {
                setHabits(response.data.data);
            }
        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    useEffect(() => {
        getHabits();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {habits.length === 0 ? (
                // No habits section
                <div className="text-center space-y-4">
                    <div className="mb-6 flex items-center justify-center">
                        <img
                            src={gifImage}
                            alt="No habits illustration"
                            className="w-72 md:w-96 h-auto"
                        />
                    </div>

                    <p className="text-2xl font-semibold text-gray-800">No Habits Found</p>
                    <p className="text-lg text-gray-600">
                        It looks like you haven't added any habits yet. Start building your routine now!
                    </p>

                    <Link
                        to="/add-habit"
                        className="inline-block px-5 py-2 text-lg font-medium text-white bg-teal-500 rounded-md shadow-lg hover:bg-teal-600 transition-all duration-300"
                    >
                        + Add Habit
                    </Link>
                </div>
            ) : (
                // Dashboard with habits
                <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold text-teal-600 mb-4">Your Habits</h2>
                    {/* Display each habit here */}
                    <ul>
                        {habits.map((habit) => (
                            <li key={habit._id} className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm">
                                <h3 className="text-xl font-medium text-gray-800">{habit.name}</h3>
                                <p className="text-gray-600">{habit.goal}</p>
                                <p className="text-gray-500">Frequency: {habit.frequency}</p>
                                {/* Add more habit details here as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
