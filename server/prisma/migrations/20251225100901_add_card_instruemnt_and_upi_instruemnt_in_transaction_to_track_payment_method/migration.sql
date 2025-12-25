/*
  Warnings:

  - Added the required column `cardInstrumentId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upiInstrumentId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "cardInstrumentId" TEXT NOT NULL,
ADD COLUMN     "upiInstrumentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cardInstrumentId_fkey" FOREIGN KEY ("cardInstrumentId") REFERENCES "CardInstrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_upiInstrumentId_fkey" FOREIGN KEY ("upiInstrumentId") REFERENCES "UpiInstrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
