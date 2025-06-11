-- CreateTable
CREATE TABLE `Estudante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `sobrenome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Estudante_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Simulacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEstudante` INTEGER NOT NULL,
    `valor_total` DOUBLE NOT NULL,
    `quantidade_parcelas` INTEGER NOT NULL,
    `juros_ao_mes` DOUBLE NOT NULL,
    `valor_parcela_mensal` DOUBLE NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Simulacao` ADD CONSTRAINT `Simulacao_idEstudante_fkey` FOREIGN KEY (`idEstudante`) REFERENCES `Estudante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
