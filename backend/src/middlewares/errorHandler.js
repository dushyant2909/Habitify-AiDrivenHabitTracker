import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    // If the error is an instance of ApiError, extract its properties
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    // For all other types of errors, respond with a generic message
    console.error('Unexpected Error:', err); // Log the error for debugging
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [err.message || "Something went wrong"],
    });
};

export default errorHandler;