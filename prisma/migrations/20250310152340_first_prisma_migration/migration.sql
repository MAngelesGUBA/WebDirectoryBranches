-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "branchName" TEXT NOT NULL,
    "branchName_Unaccent" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "areaName" TEXT NOT NULL,
    "areaName_Unaccent" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extension" (
    "id" SERIAL NOT NULL,
    "fk_idBranch" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "fk_idArea" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "extension" INTEGER NOT NULL,

    CONSTRAINT "Extension_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Extension_email_key" ON "Extension"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Extension_extension_key" ON "Extension"("extension");

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_fk_idArea_fkey" FOREIGN KEY ("fk_idArea") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_fk_idBranch_fkey" FOREIGN KEY ("fk_idBranch") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
