import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/AxiosInstance';

const AddHabit = () => {
    const [habitData, setHabitData] = useState({
        name: '',
        category: '',
        goal: '',
        dailyEffort: '',
        priority: '',
        reminderTime: '',
        frequency: '',
        startDate: '',
        motivationPreference: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitData({ ...habitData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/v1/habit", habitData);
            if (response.data.success) {
                toast.success(response.data.message);
                resetForm();
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error(error.response?.data?.message)
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    // Function to reset the form
    const resetForm = () => {
        setHabitData({
            name: '',
            category: '',
            goal: '',
            dailyEffort: '',
            priority: '',
            reminderTime: '',
            frequency: '',
            startDate: '',
            motivationPreference: '',
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-5 px-5">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-lg"
            >
                <h1 className="text-2xl font-semibold text-teal-600 mb-2 text-center">
                    Add a New Habit
                </h1>

                {/* Habit Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Habit Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={habitData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., Morning Jog"
                        required
                        autoComplete='off'
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Habit Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        value={habitData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="Fitness">Fitness</option>
                        <option value="Health">Health</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Mindfulness">Mindfulness</option>
                        <option value="Learning">Learning</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Goal */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Goal or Target Outcome <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="goal"
                        value={habitData.goal}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., Lose 5kg in 3 months"
                        required
                        autoComplete='off'
                    />
                </div>

                {/* Daily Effort */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Daily Effort (in minutes) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="dailyEffort"
                        value={habitData.dailyEffort}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., 30"
                        required
                    />
                </div>

                {/* Priority */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Priority Level <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="priority"
                        value={habitData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    >
                        <option value="" disabled>
                            Select Priority
                        </option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* Reminder Time */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Reminder Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="time"
                        name="reminderTime"
                        value={habitData.reminderTime}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </div>

                {/* Frequency */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Habit Frequency <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="frequency"
                        value={habitData.frequency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    >
                        <option value="" disabled>
                            Select Frequency
                        </option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={habitData.startDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    />
                </div>

                {/* Motivation Preference */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Motivation Preference <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="motivationPreference"
                        value={habitData.motivationPreference}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                    >
                        <option value="" disabled>
                            Select Motivation Style
                        </option>
                        <option value="Quotes">Quotes</option>
                        <option value="Reminders">Reminders</option>
                        <option value="Emails">Emails</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-teal-500 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition-all duration-300"
                >
                    Add Habit
                </button>
            </form>
        </div>
    );
};

export default AddHabit;
