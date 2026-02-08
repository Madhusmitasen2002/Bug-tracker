const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const ticketRoutes = require("./routes/ticket.routes");
const commentRoutes = require("./routes/comment.routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

/* ---------- BODY & COOKIES ---------- */
app.use(express.json());
app.use(cookieParser());

/* ---------- CORS ---------- */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

/* ---------- SECURITY ---------- */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/* ---------- ROUTES ---------- */
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tickets", ticketRoutes);
app.use("/comments", commentRoutes);

/* ---------- HEALTH ---------- */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* ---------- ERROR HANDLER ---------- */
app.use(errorHandler);

module.exports = app;
