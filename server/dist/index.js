"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./prisma");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, prisma_1.connectDB)();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
    server.close(async () => {
        await (0, prisma_1.disconnectDB)();
        process.exit(1);
    });
});
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception at:", error);
    server.close(async () => {
        await (0, prisma_1.disconnectDB)();
        process.exit(1);
    });
});
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, closing server");
    server.close(async () => {
        await (0, prisma_1.disconnectDB)();
        process.exit(0);
    });
});
exports.default = app;
