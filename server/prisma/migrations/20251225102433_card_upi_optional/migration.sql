-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "cardInstrumentId" DROP NOT NULL,
ALTER COLUMN "upiInstrumentId" DROP NOT NULL;
