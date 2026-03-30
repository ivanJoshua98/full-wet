/*
  Warnings:

  - You are about to drop the column `descripcion` on the `OnThisDay` table. All the data in the column will be lost.
  - You are about to drop the column `dia` on the `OnThisDay` table. All the data in the column will be lost.
  - You are about to drop the column `mes` on the `OnThisDay` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `OnThisDay` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[day,month]` on the table `OnThisDay` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `OnThisDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `OnThisDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `OnThisDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `OnThisDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `OnThisDay` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OnThisDay_dia_mes_idx";

-- DropIndex
DROP INDEX "OnThisDay_dia_mes_titulo_key";

-- AlterTable
ALTER TABLE "OnThisDay" DROP COLUMN "descripcion",
DROP COLUMN "dia",
DROP COLUMN "mes",
DROP COLUMN "titulo",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "title" VARCHAR(100) NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "OnThisDay_day_month_idx" ON "OnThisDay"("day", "month");

-- CreateIndex
CREATE UNIQUE INDEX "OnThisDay_day_month_key" ON "OnThisDay"("day", "month");
