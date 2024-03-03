// Importing required modules
import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

// Load environment variables from the config file
dotenv.config({ path: "./.env" });

// Create an instance of Express
const app = express();

// Get the port from environment variables
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined in .env

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes setup
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Handle preflight requests
app.options("*", cors());

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
