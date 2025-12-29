import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB, disconnectDB } from "./prisma";
import authRouter from "./routes/auth.route";
import instrumentRouter from "./routes/instrument.route";
import beneficiaryRouter from "./routes/beneficiary.route";
import transactionRouter from "./routes/transaction.route";
import userRouter from "./routes/user.route";

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRouter);

app.use("/api/instrument", instrumentRouter);

app.use("/api/beneficiary", beneficiaryRouter);

app.use("/api/transaction", transactionRouter);

app.use("/api/user", userRouter);

async function startServer() {
  try {
    await connectDB();

    const server = app.listen(process.env.PORT || 8080, () => {
      console.log(`Server started on port ${process.env.PORT || 3000}`);
    });

    const shutdown = async (code: number) => {
      console.log("Shutting down server...");
      server.close(async () => {
        await disconnectDB();
        process.exit(code);
      });
    };

    process.on("unhandledRejection", (reason, promise) => {
      console.log("Unhandled Rejection at:", promise, "reason:", reason);
      shutdown(1);
    });

    process.on("uncaughtException", (error) => {
      console.log("Uncaught Exception at:", error);
      shutdown(1);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, closing server");
      shutdown(0);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

export default app;
