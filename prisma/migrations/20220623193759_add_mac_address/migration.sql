/*
  Warnings:

  - Added the required column `macAddress` to the `Lock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lock" ADD COLUMN     "macAddress" TEXT NOT NULL;
