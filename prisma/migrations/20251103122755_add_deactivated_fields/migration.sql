-- AlterTable
ALTER TABLE "Paste" ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deactivatedReason" TEXT;
