/*
  Warnings:

  - You are about to drop the column `isSprint` on the `Race` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[seasonYear,round]` on the table `Race` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Race" DROP COLUMN "isSprint",
ADD COLUMN     "firstPractice" TIMESTAMP(3),
ADD COLUMN     "qualifying" TIMESTAMP(3),
ADD COLUMN     "secondPractice" TIMESTAMP(3),
ADD COLUMN     "sprint" TIMESTAMP(3),
ADD COLUMN     "thirdPractice" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "QualifyingResult" (
    "id" SERIAL NOT NULL,
    "raceId" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "q1" TEXT,
    "q2" TEXT,
    "q3" TEXT,

    CONSTRAINT "QualifyingResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_seasonYear_round_key" ON "Race"("seasonYear", "round");

-- AddForeignKey
ALTER TABLE "QualifyingResult" ADD CONSTRAINT "QualifyingResult_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifyingResult" ADD CONSTRAINT "QualifyingResult_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualifyingResult" ADD CONSTRAINT "QualifyingResult_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
