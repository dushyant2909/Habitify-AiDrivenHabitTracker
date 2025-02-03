import dotenv from 'dotenv'
dotenv.config()
import { app } from './app.js'
import connectDB from './db/index.js';

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running at port ${port}`);
        })
    })
    .catch((err) => {
        console.log("Mongodb connection failed, ", err.message);
    })