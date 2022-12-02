import dotenv from "dotenv";
dotenv.config();

export const {APP_NAME,APP_URL, APP_PORT,DEBUG_MODE,JWT_SECRET,REFRESH_SECRET,FRONTEND_URL } = process.env;
