import express from "express";
const authRoute = express.Router();

import { Login } from "../controllers/Auth/AuthController.js";

authRoute.post("/login", Login);

export default authRoute;
