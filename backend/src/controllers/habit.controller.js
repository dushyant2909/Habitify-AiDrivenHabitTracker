import { Habit } from '../models/Habit.model.js';
import ApiError from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Create a new habit
const createHabit = asyncHandler(async (req, res) => {
    const {
        name,
        category,
        goal,
        dailyEffort,
        priority,
        reminderTime,
        frequency,
        startDate,
        motivationPreference,
    } = req.body;

    // Validate required fields
    if (!name || !category || !goal || !dailyEffort || !priority || !reminderTime || !frequency || !startDate) {
        throw new ApiError(400, 'All required fields must be provided');
    }

    // Create the habit
    const habit = await Habit.create({
        user: req.user._id,
        name,
        category,
        goal,
        dailyEffort,
        priority,
        reminderTime,
        frequency,
        startDate,
        motivationPreference,
    });

    return res.status(201).json(new ApiResponse(201, habit, 'Habit added successfully'));
});

// Get all habits for the logged-in user
const getHabits = asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user._id });
    return res.status(200).json(new ApiResponse(200, habits, 'Habits retrieved successfully'));
});

// Update a habit
const updateHabit = asyncHandler(async (req, res) => {
    const { _id, ...updateData } = req.body;
    const userId = req.user._id; // Assuming `req.user` is populated via authentication middleware

    // Find the habit by ID and user, and update it with new data
    const habit = await Habit.findOneAndUpdate(
        { _id, user: userId },
        updateData,
        { new: true, runValidators: true }
    );

    if (!habit) {
        throw new ApiError(404, "Habit not found or unauthorized");
    }

    return res.status(200).json(new ApiResponse(200, habit, "Habit updated successfully"));
});

// Mark a habit as completed for the current date
const completeHabit = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const habit = await Habit.findOne({ _id: id, user: req.user._id });
    if (!habit) {
        throw new ApiError(404, 'Habit not found');
    }

    habit.completedDates.push(new Date());
    await habit.save();

    return res.status(200).json(new ApiResponse(200, habit, 'Habit marked as completed for today'));
});

// Archive or delete a habit
const deleteHabit = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete(
        { _id: id, user: req.user._id }
    );

    if (!habit) {
        throw new ApiError(404, 'Habit not found or unauthorized');
    }

    return res.status(200).json(new ApiResponse(200, habit, 'Habit deleted successfully'));
});

export { createHabit, getHabits, updateHabit, completeHabit, deleteHabit };
