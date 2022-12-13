import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

//Security Middleware Import
import cors from "cors";
import morgan from "morgan";

// Route Middleware Impost
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import categoryRoutes from "./routes/category.js";

// Env Config
dotenv.config();
app.use(express.json());

//Security Middleware Implement
app.use(cors());
app.use(morgan("common"));
app.use("/images", express.static("images"));

// Uploads File Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const uploads = multer({ storage: storage });

app.post("/api/v1/upload", uploads.single("file"), (req, res) => {
  res.status(200).json("Image Upload Success");
});
// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/category", categoryRoutes);

// Mongo DB Database Connection 🔂
mongoose.set("strictQuery", true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://salmanazmirafi:salmanazmirafi@cluster0.exejumv.mongodb.net/data-store?retryWrites=true&w=majority", () => {
  console.log("Database Connection 🔂 Success");
});

// Server Connection 🔂
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));

//Undefined Route
app.get("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});
