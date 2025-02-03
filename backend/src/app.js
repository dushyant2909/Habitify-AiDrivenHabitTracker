import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from "./middlewares/errorHandler.js";
import logger from "../logger.js";
import morgan from "morgan";

import healthCheckRoute from "./routes/healthCheckRoutes.js";
import userRoute from "./routes/userRoutes.js";
import habitRoute from './routes/habitRoutes.js';

const morganFormat = ":method :url :status :response-time ms";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "16kb",
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}));

app.use(cookieParser());

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

// Routes
app.use("/api/v1/healthcheck", healthCheckRoute);
app.use("/api/v1/user", userRoute);
app.use('/api/v1/habit', habitRoute);

app.use(errorHandler);

export { app };