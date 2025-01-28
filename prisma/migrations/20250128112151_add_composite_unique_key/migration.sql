/*
  Warnings:

  - A unique constraint covering the columns `[productId,orderId]` on the table `OrderProductMap` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderProductMap_productId_orderId_key" ON "OrderProductMap"("productId", "orderId");
