/*
  Warnings:

  - You are about to drop the column `description` on the `OnThisDay` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `OnThisDay` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `OnThisDay` table. All the data in the column will be lost.
  - Added the required column `history` to the `OnThisDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnThisDay" DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "year",
ADD COLUMN     "history" TEXT NOT NULL;
