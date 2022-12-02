import express from "express";
import auth from "../middlewares/auth";
import { bookLists } from "../controllers/userController";
const userRoute = express.Router();
userRoute.get("/booklists", auth, bookLists);
export default userRoute;
