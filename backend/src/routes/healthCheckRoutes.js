import { healthCheck } from "../controllers/healthCheck.controller.js";
import { Router } from 'express'

const healthCheckRoute = Router()

healthCheckRoute.route("/").get(healthCheck)

export default healthCheckRoute;