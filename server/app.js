import express from "express";
import dotenv from "dotenv";
import videoRoutes from "./controllers/index.js";
import teacherRoutes from "./controllers/teacher/index.js"
import studentRoutes from "./controllers/student/index.js"
import loginRoutes from './controllers/login/index.js'
import courseRoutes from './controllers/course/index.js'
import chapterRoutes from './controllers/chapter/index.js'
import authRoutes from './controllers/auth/index.js'
import cors from 'cors';

import './dbConnect.js'


dotenv.config();


// Express App
const app = express();
const port = process.env.PORT || 5010;

app.use(cors());

// app.use(cors({
//   origin: 'https://lms-world.netlify.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));


app.use(express.json());

// Routes
app.use("/api/videos", videoRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/auth", authRoutes);



app.listen(port, () => {
  console.log("Server started listening on port", port);
});

