import express, { type Request, type Response } from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cors from "cors";
import connect from "./config/data.js";
connect()
config();
const PORT = 5000;
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/api/v1", appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
