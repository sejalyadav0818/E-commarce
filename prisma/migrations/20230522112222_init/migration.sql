/*
  Warnings:

  - You are about to drop the column `category_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_category_id_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `category_id`;
