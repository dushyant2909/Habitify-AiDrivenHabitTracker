import mongoose, { Schema } from 'mongoose';

// Define the Habit schema
const habitSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Habit name is required'],
            minlength: [3, 'Habit name must be at least 3 characters long'],
        },
        category: {
            type: String,
            enum: ['Fitness', 'Health', 'Productivity', 'Mindfulness', 'Learning', 'Other'],
            required: true,
        },
        goal: {
            type: String,
            required: [true, 'Goal is required for the habit'],
            maxlength: [200, 'Goal cannot exceed 200 characters'],
        },
        dailyEffort: {
            type: Number, // Daily effort in minutes
            required: [true, 'Daily effort is required'],
            min: [1, 'Daily effort must be at least 1 minute'],
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            required: true,
        },
        reminderTime: {
            type: String, // Format: "HH:mm" (24-hour format)
            required: true,
        },
        frequency: {
            type: String,
            enum: ['Daily', 'Weekly', 'Monthly'],
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        motivationPreference: {
            type: String,
            enum: ['Quotes', 'Reminders', 'Emails'],
            default: 'Reminders',
        },
        completedDates: {
            type: [Date], // Array of dates when the habit was marked as completed
            default: [],
        },
    },
    { timestamps: true }
);

export const Habit = mongoose.model('Habit', habitSchema);
