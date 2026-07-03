import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
