-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "liga" TEXT NOT NULL DEFAULT 'Outros Times',
    "categoria" TEXT NOT NULL,
    "imagens" TEXT NOT NULL,
    "precoVenda" REAL NOT NULL,
    "custoNacional" REAL,
    "custoInternacional" REAL,
    "disponivelNacional" BOOLEAN NOT NULL DEFAULT false,
    "tamanhos" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Produto" ("ativo", "categoria", "createdAt", "custoInternacional", "custoNacional", "disponivelNacional", "id", "imagens", "nome", "precoVenda", "tamanhos", "time", "updatedAt") SELECT "ativo", "categoria", "createdAt", "custoInternacional", "custoNacional", "disponivelNacional", "id", "imagens", "nome", "precoVenda", "tamanhos", "time", "updatedAt" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
