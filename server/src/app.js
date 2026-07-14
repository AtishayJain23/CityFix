const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const complaintRoutes = require("./routes/complaint.routes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("CityFix API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use((err, req, res, next) => {

  res.status(500).json({
    success: false,
    message: err.message,
    error: err,
  });
});

module.exports = app;
