-- CreateTable
CREATE TABLE "SprintResult" (
    "id" SERIAL NOT NULL,
    "raceId" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "points" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grid" INTEGER,
    "status" TEXT,
    "laps" INTEGER,

    CONSTRAINT "SprintResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SprintResult" ADD CONSTRAINT "SprintResult_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintResult" ADD CONSTRAINT "SprintResult_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SprintResult" ADD CONSTRAINT "SprintResult_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
