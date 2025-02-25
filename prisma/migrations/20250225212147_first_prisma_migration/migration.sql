-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "areaName" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extension" (
    "id" SERIAL NOT NULL,
    "employeeName" TEXT NOT NULL,
    "fk_idArea" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "numExtension" INTEGER NOT NULL,

    CONSTRAINT "Extension_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Extension_numExtension_key" ON "Extension"("numExtension");

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_fk_idArea_fkey" FOREIGN KEY ("fk_idArea") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
