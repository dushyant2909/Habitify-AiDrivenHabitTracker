import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/habitify`)
        console.log("Connected successfully to Database || DB Host::", connectionInstance.connection.host)
    } catch (error) {
        console.log("Error in connecting DB::", error.message)
        process.exit(1)
    }
}

export default connectDB;