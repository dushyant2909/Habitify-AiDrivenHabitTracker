import axios from "axios";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const suggestHabit = asyncHandler(async (req, res) => {
    const { category, goal } = req.body;

    if (!category && !goal) {
        throw new ApiError(400, "Goal or Category is required");
    }

    let promt = "";
    if (category)
        promt = `Based on the ${category} category, suggest a good habit to follow along with a short description telling what to do and how. Only respond with the habit in the following JSON format: {"title": "habit title", "description": "habit description"}. Do not include any other text or explanation.`
    else
        promt = `Suggest a good habit to follow along with a short description to achieve ${goal} goal, . Only respond with the habit in the following JSON format: {"title": "habit title", "description": "habit description"}. Do not include any other text or explanation.`

    console.log("PR:",promt);
    // Define a prompt for AI
    const options = {
        "model": "tinyllama",
        "prompt": promt,
        "stream": false,
        "max_tokens": 50,  // Allow space for both title and description
        "temperature": 0.3
    };

    try {
        // Call Ollama API
        const response = await axios.post("http://localhost:11434/api/generate", options);

        // Clean and parse the response to ensure it is in JSON format
        let aiResponse = response.data.response.trim();  // Clean response
        aiResponse = aiResponse.replace(/(\r\n|\n|\r)/gm, "");  // Remove any newline characters

        // Attempt to parse the response as JSON
        let habit = {};
        try {
            habit = JSON.parse(aiResponse);  // Convert string response to JSON object
        } catch (e) {
            throw new ApiError(500, "Failed to parse AI response into JSON format");
        }

        // Return response in JSON format
        return res.status(200).json(new ApiResponse(200, habit, "Habit suggestion generated successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to get habit suggestion from AI");
    }
});

export { suggestHabit };
