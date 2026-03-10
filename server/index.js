import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDb from "./config/db.js";

import userRouter from "./routes/userRoute.js";
import foodRoute from "./routes/foodRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import adminRoute from "./routes/adminRoute.js";
import visitorRouter from "./routes/visitorRoute.js";

import limiter from "./config/rateLimiter.js";
import { redis } from "./config/redis.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 4000;

connectDb();

app.use(cors({ origin:["http://localhost:5173", "http://localhost:5174"],

   credentials: true
}));
app.use(express.json());
app.set("trust proxy", 1);
app.use(limiter);

/* ---------- Health check (frontend cold start) ---------- */
app.get("/api/health", async (req, res) => {
  try {
    if (redis) {
      // optional Redis touch
      await redis.set("health_ping", Date.now(), { ex: 300 });
    }
    res.status(200).json({ status: "ready" });
  } catch {
    res.status(200).json({ status: "ready" });
  }
});

/* ---------- Redis keepalive (cron calls this) ---------- */
app.get("/api/cron/redis-keepalive", async (req, res) => {
  try {
    if (redis) {
      await redis.set("keepalive", Date.now(), { ex: 60 });
      console.log("✅ Redis keepalive ping");
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("❌ Redis keepalive failed:", error.message);
    res.status(200).json({ ok: false });
  }
});

app.use("/api", visitorRouter);
app.use("/api/user", userRouter);
app.use("/api/food", foodRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log("✅ Server running on PORT:", PORT);
});
