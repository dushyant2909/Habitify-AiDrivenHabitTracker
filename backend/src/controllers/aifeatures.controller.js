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

const getMotivationalQuotes = asyncHandler(async (req, res) => {
    const options = {
        "model": "tinyllama",
        "prompt": `Generate a short and powerful motivational quote. Only respond with the quote in the following JSON format: {"quote": "quote content"}. Do not give any king of other text or explanation. Also if quote is of some author then dont mention the author name.`,
        "stream": false,
        "max_tokens": 50,  // Allow space for a concise response
        "temperature": 0.3
    };

    try {
        // Call Ollama API
        const response = await axios.post("http://localhost:11434/api/generate", options);

        // Extract and clean response
        let aiResponse = response.data.response.trim();

        // Attempt to parse the response as JSON
        let quote = {};
        try {
            quote = JSON.parse(aiResponse);  // Convert string response to JSON object
        } catch (e) {
            throw new ApiError(500, "Failed to parse AI response into JSON format");
        }

        // Return response in JSON format
        return res.status(200).json(new ApiResponse(200, quote, "Motivational quote generated successfully"));
    } catch (error) {
        throw new ApiError(500, "Failed to get motivational quote from AI");
    }
});

export { suggestHabit, getMotivationalQuotes };
