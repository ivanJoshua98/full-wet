-- CreateTable
CREATE TABLE "DriverStanding" (
    "id" SERIAL NOT NULL,
    "seasonYear" INTEGER NOT NULL,
    "driverId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DriverStanding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstructorStanding" (
    "id" SERIAL NOT NULL,
    "seasonYear" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ConstructorStanding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DriverStanding_seasonYear_driverId_key" ON "DriverStanding"("seasonYear", "driverId");

-- CreateIndex
CREATE UNIQUE INDEX "ConstructorStanding_seasonYear_teamId_key" ON "ConstructorStanding"("seasonYear", "teamId");

-- AddForeignKey
ALTER TABLE "DriverStanding" ADD CONSTRAINT "DriverStanding_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "Season"("year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverStanding" ADD CONSTRAINT "DriverStanding_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstructorStanding" ADD CONSTRAINT "ConstructorStanding_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "Season"("year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstructorStanding" ADD CONSTRAINT "ConstructorStanding_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
