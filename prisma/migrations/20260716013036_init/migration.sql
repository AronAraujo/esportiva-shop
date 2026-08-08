-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "time" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "ConfigLoja" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "whatsappNumero" TEXT NOT NULL,
    "freteNacional" REAL NOT NULL DEFAULT 30,
    "freteInternacional" REAL NOT NULL DEFAULT 0,
    "prazoNacionalMin" INTEGER NOT NULL DEFAULT 5,
    "prazoNacionalMax" INTEGER NOT NULL DEFAULT 10,
    "prazoInternMin" INTEGER NOT NULL DEFAULT 20,
    "prazoInternMax" INTEGER NOT NULL DEFAULT 40,
    "avisoPrazo" TEXT,
    "updatedAt" DATETIME NOT NULL
);
