-- CreateTable
CREATE TABLE "OnThisDay" (
    "id" SERIAL NOT NULL,
    "dia" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnThisDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OnThisDay_dia_mes_idx" ON "OnThisDay"("dia", "mes");

-- CreateIndex
CREATE UNIQUE INDEX "OnThisDay_dia_mes_titulo_key" ON "OnThisDay"("dia", "mes", "titulo");
