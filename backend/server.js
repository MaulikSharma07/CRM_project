const express = require("express");
const authenticate = require("./src/middleware/auth");
const prisma = require("./src/lib/prisma");
const authRoutes = require("./src/routes/auth");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Authenticated successfully",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "CRM Backend is running" });
});

app.get("/test-db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ message: "Database connected!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});