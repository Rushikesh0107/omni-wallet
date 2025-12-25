"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.disconnectDB = exports.connectDB = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"]
});
exports.prisma = prisma;
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected");
    }
    catch (e) {
        console.log("Database connection error", e);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("Database disconnected");
};
exports.disconnectDB = disconnectDB;
