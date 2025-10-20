const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const facultyRoutes = require("./routes/faculty");
const departmentRoutes = require("./routes/departments");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, try again later",
});
// CORS first
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);

// Secure HTTP headers
app.use(helmet());

// Body parser
app.use(bodyParser.json());
app.use(cookieParser());
// Rate limiter last
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/departments", departmentRoutes);

// Root route
app.get("/", (req, res) => res.send("ERP Backend running"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
