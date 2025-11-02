-- AlterTable
ALTER TABLE "Paste" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
