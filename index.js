import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import express from 'express';
import mongoose from "mongoose";

import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from './Kanbas/modules/routes.js';
import cors from "cors";
import AssignmentRoutes from './Kanbas/Assignment/routes.js';
import UserRoutes from './Kanbas/Users/routes.js';
import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app)
Hello(app)
UserRoutes(app);

app.listen(process.env.PORT || 4000)