/*
  Warnings:

  - You are about to alter the column `price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `price` VARCHAR(191) NOT NULL,
    MODIFY `quantity` VARCHAR(191) NOT NULL;
