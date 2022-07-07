/*
  Warnings:

  - You are about to drop the column `macAddress` on the `Lock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceUUID]` on the table `Lock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceUUID` to the `Lock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lock" DROP COLUMN "macAddress",
ADD COLUMN     "serviceUUID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lock_serviceUUID_key" ON "Lock"("serviceUUID");
