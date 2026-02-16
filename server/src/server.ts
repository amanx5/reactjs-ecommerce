import { sequelize } from "@/sequelize";
import { cartRouter, ordersRouter, productsRouter } from "@/routes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Load .env file contents into process.env
dotenv.config();

// create express app
const app = express();
const PORT = process.env.PORT ?? 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send(`<a href="${process.env.FRONTEND_URL}">Go to Ecommerce Website</a>`);
});

// Routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal server error' });
// });

startServer();

/**
 * Starts the application server
 */
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connection established");

    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✓ Database synchronized");

    // Listen for HTTP requests on `PORT`
    app.listen(PORT, () => {
      console.log(
        `✓ Server running on port ${PORT} => http://localhost:${PORT}/`,
      );
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error);
    process.exit(1);
  }
}
