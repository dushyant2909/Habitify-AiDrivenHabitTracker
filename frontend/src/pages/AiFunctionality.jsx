import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";

export default function AiFunctionality() {
    const [category, setCategory] = useState("");
    const [goal, setGoal] = useState("");
    const [habit, setHabit] = useState(null);
    const [quote, setQuote] = useState("");
    const [loadingHabit, setLoadingHabit] = useState(false);
    const [loadingQuote, setLoadingQuote] = useState(false);
    const [error, setError] = useState("");
    const [showHabitPopup, setShowHabitPopup] = useState(false);

    const categories = ['Fitness', 'Health', 'Productivity', 'Mindfulness', 'Learning'];

    const fetchHabit = async () => {
        if ((category && goal) || (!category && !goal)) {
            setError("Please select a Category or enter a Goal, not both.");
            return;
        }
        setLoadingHabit(true);
        setError("");
        try {
            const response = await axiosInstance.post("/api/v1/ai/suggest-habit", { "category": category, "goal": goal });
            let habits = response.data.data;
            // Ensure habits is always an array
            if (!Array.isArray(habits)) {
                habits = [habits]; // Wrap single object in an array
            }
            setHabit(habits);
            setShowHabitPopup(true);
        } catch (err) {
            setError("Failed to fetch habit. Try again.");
        }
        setLoadingHabit(false);
    };

    const fetchQuote = async () => {
        setLoadingQuote(true);
        setError("");
        try {
            const response = await axiosInstance.get("/api/v1/ai/get-motivational-quotes");
            setQuote(response.data.data.quote);
        } catch (err) {
            setQuote("Be the change you want to see in the world.");
            console.log("Failed to fetch quote. Try again.");
        }
        setLoadingQuote(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            {quote && (
                <div className="w-full max-w-lg bg-yellow-100 text-gray-800 text-center p-4 mb-4 rounded shadow-md">
                    <p className="italic">"{quote}"</p>
                </div>
            )}
            <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">AI-Powered Habit Suggestion & Motivation</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                {/* Habit Suggestion Form */}
                <div className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">Get Habit Suggestion</h3>
                    <p className="text-sm text-gray-600 mb-2">Select a Category or enter a Goal, not both.</p>
                    <select
                        className="w-full p-2 border rounded mb-2"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); setGoal(""); }}
                        disabled={goal}
                    >
                        <option value="">Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="search"
                        className="w-full p-2 border rounded"
                        placeholder="Goal (e.g. Lose weight)"
                        value={goal}
                        onChange={(e) => { setGoal(e.target.value); setCategory(""); }}
                        disabled={category}
                    />
                    <button
                        onClick={fetchHabit}
                        className="w-full bg-blue-600 text-white py-2 mt-2 rounded hover:bg-blue-700 transition"
                        disabled={loadingHabit}
                    >
                        {loadingHabit ? "Fetching Habit..." : "Get Habit Suggestion"}
                    </button>
                </div>

                {/* Motivational Quote Form */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Get Motivational Quote</h3>
                    <button
                        onClick={fetchQuote}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        disabled={loadingQuote}
                    >
                        {loadingQuote ? "Fetching Quote..." : "Get Motivational Quote"}
                    </button>
                </div>
            </div>

            {/* Habit Popup */}
            {/* Habit Popup */}
            {showHabitPopup && habit.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[50rem] text-center overflow-y-auto max-h-96">
                        <h3 className="text-2xl text-green-700 font-bold mb-4">Suggested Habits</h3>
                        <div className="space-y-4">
                            {habit.map((h, index) => (
                                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                                    <h4 className="text-lg font-semibold">{h.title}</h4>
                                    <p className="text-gray-700">{h.description}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowHabitPopup(false)}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
