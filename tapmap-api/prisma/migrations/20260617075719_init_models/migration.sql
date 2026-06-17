-- CreateTable
CREATE TABLE "Brewery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "phone" TEXT,
    "country" TEXT NOT NULL DEFAULT 'CZ',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "foundedYear" INTEGER,
    "website" TEXT,
    "description" TEXT,
    "wikidataId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brewery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeerStyle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "BeerStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abv" DOUBLE PRECISION,
    "ibu" INTEGER,
    "description" TEXT,
    "breweryId" TEXT NOT NULL,
    "styleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeerIngredient" (
    "beerId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "BeerIngredient_pkey" PRIMARY KEY ("beerId","ingredientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brewery_wikidataId_key" ON "Brewery"("wikidataId");

-- CreateIndex
CREATE INDEX "Brewery_country_idx" ON "Brewery"("country");

-- CreateIndex
CREATE UNIQUE INDEX "BeerStyle_name_key" ON "BeerStyle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE INDEX "Beer_breweryId_idx" ON "Beer"("breweryId");

-- CreateIndex
CREATE INDEX "Beer_styleId_idx" ON "Beer"("styleId");

-- AddForeignKey
ALTER TABLE "Beer" ADD CONSTRAINT "Beer_breweryId_fkey" FOREIGN KEY ("breweryId") REFERENCES "Brewery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beer" ADD CONSTRAINT "Beer_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "BeerStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerIngredient" ADD CONSTRAINT "BeerIngredient_beerId_fkey" FOREIGN KEY ("beerId") REFERENCES "Beer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeerIngredient" ADD CONSTRAINT "BeerIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
