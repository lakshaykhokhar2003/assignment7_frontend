-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "orderDescription" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL,
    "productName" VARCHAR(100) NOT NULL,
    "productDescription" TEXT,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProductMap" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "OrderProductMap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProductMap" ADD CONSTRAINT "OrderProductMap_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductMap" ADD CONSTRAINT "OrderProductMap_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
