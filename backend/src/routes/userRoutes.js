import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import { verifyUser } from "../middlewares/authMiddleware.js";

const userRoute = Router()

userRoute.route("/signup").post(registerUser)
userRoute.route("/login").post(loginUser)

userRoute.use(verifyUser)
userRoute.route("/profile").get(getUserProfile)
userRoute.route("/logout").get(logoutUser)

export default userRoute