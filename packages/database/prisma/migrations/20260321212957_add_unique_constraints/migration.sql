/*
  Warnings:

  - A unique constraint covering the columns `[raceId,driverId]` on the table `QualifyingResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[raceId,driverId]` on the table `RaceResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[raceId,driverId]` on the table `SprintResult` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QualifyingResult_raceId_driverId_key" ON "QualifyingResult"("raceId", "driverId");

-- CreateIndex
CREATE UNIQUE INDEX "RaceResult_raceId_driverId_key" ON "RaceResult"("raceId", "driverId");

-- CreateIndex
CREATE UNIQUE INDEX "SprintResult_raceId_driverId_key" ON "SprintResult"("raceId", "driverId");
