/*
  Warnings:

  - The primary key for the `MonthHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `useId` on the `MonthHistory` table. All the data in the column will be lost.
  - The primary key for the `YearHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `useId` on the `YearHistory` table. All the data in the column will be lost.
  - Added the required column `userId` to the `MonthHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `YearHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonthHistory" (
    "userId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL,

    PRIMARY KEY ("day", "month", "year", "userId")
);
INSERT INTO "new_MonthHistory" ("day", "expense", "income", "month", "year") SELECT "day", "expense", "income", "month", "year" FROM "MonthHistory";
DROP TABLE "MonthHistory";
ALTER TABLE "new_MonthHistory" RENAME TO "MonthHistory";
CREATE TABLE "new_YearHistory" (
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL,

    PRIMARY KEY ("month", "year", "userId")
);
INSERT INTO "new_YearHistory" ("expense", "income", "month", "year") SELECT "expense", "income", "month", "year" FROM "YearHistory";
DROP TABLE "YearHistory";
ALTER TABLE "new_YearHistory" RENAME TO "YearHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
