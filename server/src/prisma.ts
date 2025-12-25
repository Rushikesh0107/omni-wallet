import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log : process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"]
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully")
    } catch (e) {
        console.log("Database connection error", e)
        process.exit(1);
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("Database disconnected")
}

export {connectDB, disconnectDB, prisma};
