import React, { useEffect, useState } from "react";
import gifImage from "../assets/empty_habits_page_gif.gif";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import axiosInstance from "../utils/AxiosInstance";

const ManageHabit = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHabit, setSelectedHabit] = useState(null); // For viewing a habit
    const [editHabit, setEditHabit] = useState(null); // For editing a habit
    const [formData, setFormData] = useState({}); // For edit form data

    const fetchHabits = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/api/v1/habit");
            setHabits(response.data.data);
        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Failed to fetch habits.");
        } finally {
            setLoading(false);
        }
    };

    const deleteHabit = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/v1/habit/${id}`);
            toast.success(response.data.message || "Habit deleted successfully");
            await fetchHabits();
        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Failed to delete habit.");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put("/api/v1/habit", formData);
            toast.success(response.data.message || "Habit updated successfully");
            setEditHabit(null);
            await fetchHabits();
        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Failed to update habit.");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    if (loading) {
        return <Loader message="Loading Habits" />;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            {selectedHabit ? (
                // Render Selected Habit Details
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
                    <h1 className="text-2xl font-semibold text-teal-600 mb-6">Habit Details</h1>
                    <div className="space-y-4">
                        <p>
                            <strong>Name:</strong> {selectedHabit.name}
                        </p>
                        <p>
                            <strong>Goal:</strong> {selectedHabit.goal}
                        </p>
                        <p><strong>Category:</strong> {selectedHabit.category}</p>
                        <p><strong>Priority:</strong> {selectedHabit.priority}</p>
                        <p><strong>Frequency:</strong> {selectedHabit.frequency}</p>
                        <p><strong>Daily Effort:</strong> {selectedHabit.dailyEffort} minutes</p>
                        <p><strong>Reminder Time:</strong> {selectedHabit.reminderTime}</p>
                        <p><strong>Motivation Preference:</strong> {selectedHabit.motivationPreference}</p>
                        <p><strong>Start Date:</strong> {new Date(selectedHabit.startDate).toDateString()}</p>

                    </div>
                    <button
                        onClick={() => setSelectedHabit(null)} // Reset selectedHabit to null
                        className="mt-6 px-4 py-1 text-lg font-medium text-white bg-gray-500 rounded-md shadow-lg hover:bg-gray-600 transition-all duration-300"
                    >
                        Back
                    </button>
                </div>
            ) :
                editHabit ? (
                    // Edit Habit Form
                    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
                        <h1 className="text-2xl font-semibold text-teal-600 mb-6">Edit Habit</h1>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    autoComplete="off"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Goal</label>
                                <input
                                    type="text"
                                    name="goal"
                                    value={formData.goal || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Daily Effort (Minutes)</label>
                                <input
                                    type="number"
                                    name="dailyEffort"
                                    value={formData.dailyEffort || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Reminder Time</label>
                                <input
                                    type="time"
                                    name="reminderTime"
                                    value={formData.reminderTime || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate ? new Date(formData.startDate).toISOString().substr(0, 10) : ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Motivation Preference</label>
                                <select
                                    name="motivationPreference"
                                    value={formData.motivationPreference}
                                    onChange={handleInputChange}
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
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setEditHabit(null)}
                                    className="px-5 py-2 text-lg font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-lg font-medium text-white bg-teal-500 rounded-md hover:bg-teal-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                ) :
                    (
                        // Render Habits List
                        <div>
                            {habits.length === 0 ? (
                                // No Habits Found
                                <div className="flex flex-col items-center justify-center">
                                    <div className="mb-6">
                                        <img
                                            src={gifImage}
                                            alt="No habits illustration"
                                            className="w-72 md:w-96 h-auto"
                                        />
                                    </div>
                                    <div className="text-center space-y-4">
                                        <p className="text-2xl font-semibold text-gray-800">
                                            No Habits Found
                                        </p>
                                        <p className="text-lg text-gray-600">
                                            It looks like you haven't added any habits yet. Start building
                                            your routine now!
                                        </p>
                                        <Link
                                            to="/add-habit"
                                            className="inline-block px-5 py-2 text-lg font-medium text-white bg-teal-500 rounded-md shadow-lg hover:bg-teal-600 transition-all duration-300"
                                        >
                                            + Add Habit
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                // Show Habits
                                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                                    <h1 className="text-2xl font-semibold text-teal-600 mb-6">
                                        Manage Your Habits
                                    </h1>
                                    <div className="space-y-4">
                                        {habits.map((habit) => (
                                            <div
                                                key={habit._id}
                                                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm border hover:shadow-md transition-shadow duration-300"
                                            >
                                                {/* Habit Info */}
                                                <div>
                                                    <h2 className="text-lg font-medium text-gray-800">
                                                        {habit.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-600">{habit.goal}</p>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        onClick={() => setSelectedHabit(habit)} // Set the clicked habit as selected
                                                        className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditHabit(habit)
                                                            setFormData(habit)
                                                        }
                                                        }
                                                        className="px-3 py-1 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteHabit(habit._id)}
                                                        className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add Habit Button */}
                                    <div className="mt-6 text-center">
                                        <Link
                                            to="/add-habit"
                                            className="inline-block px-5 py-2 text-lg font-medium text-white bg-teal-500 rounded-md shadow-lg hover:bg-teal-600 transition-all duration-300"
                                        >
                                            + Add Habit
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
            }
        </div >
    );
};

export default ManageHabit;
