import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import express from 'express';
import mongoose from "mongoose";

import UserRoutes from "./Kambaz/Users/routes.js";
import CoursesRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
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
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

Hello(app)
Lab5(app)
CoursesRoutes(app);
ModulesRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000)