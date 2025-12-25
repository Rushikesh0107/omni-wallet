/*
  Warnings:

  - You are about to drop the column `instrumentId` on the `CardInstrument` table. All the data in the column will be lost.
  - You are about to drop the column `instrumentId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `instrumentId` on the `UpiInstrument` table. All the data in the column will be lost.
  - You are about to drop the `Instrument` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `CardInstrument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UpiInstrument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CardInstrument" DROP CONSTRAINT "CardInstrument_instrumentId_fkey";

-- DropForeignKey
ALTER TABLE "Instrument" DROP CONSTRAINT "Instrument_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_instrumentId_fkey";

-- DropForeignKey
ALTER TABLE "UpiInstrument" DROP CONSTRAINT "UpiInstrument_instrumentId_fkey";

-- DropIndex
DROP INDEX "CardInstrument_instrumentId_key";

-- DropIndex
DROP INDEX "UpiInstrument_instrumentId_key";

-- AlterTable
ALTER TABLE "CardInstrument" DROP COLUMN "instrumentId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "instrumentId";

-- AlterTable
ALTER TABLE "UpiInstrument" DROP COLUMN "instrumentId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Instrument";

-- DropEnum
DROP TYPE "InstrumentType";

-- CreateIndex
CREATE INDEX "CardInstrument_userId_idx" ON "CardInstrument"("userId");

-- CreateIndex
CREATE INDEX "UpiInstrument_userId_idx" ON "UpiInstrument"("userId");

-- AddForeignKey
ALTER TABLE "CardInstrument" ADD CONSTRAINT "CardInstrument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpiInstrument" ADD CONSTRAINT "UpiInstrument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
