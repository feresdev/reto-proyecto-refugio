\connect refugiodb

-- Restricciones de identificadores
ALTER TABLE "Administrador"
    ADD CONSTRAINT "PK_Administrador" PRIMARY KEY ("Identificador");

ALTER TABLE "Administrador"
    ADD CONSTRAINT "UQ_Administrador_Usuario" UNIQUE ("Usuario");

ALTER TABLE "Animal"
    ADD CONSTRAINT "PK_Animal" PRIMARY KEY ("Identificador");

-- Restricciones CHECK
ALTER TABLE "Administrador"
    ADD CONSTRAINT "CK_Administrador_Usuario_Max15"
    CHECK (char_length("Usuario") <= 15),
    ADD CONSTRAINT "CK_Administrador_Contrasena_Max60"
    CHECK (char_length("Contrasena") <= 60);

ALTER TABLE "Administrador"
    ALTER COLUMN "Usuario" SET NOT NULL,
    ALTER COLUMN "Contrasena" SET NOT NULL;

ALTER TABLE "Animal"
    ADD CONSTRAINT "CK_Animal_Sexo"
    CHECK ("Sexo" IN ('Hembra', 'Macho')),
    ADD CONSTRAINT "CK_Animal_TipoAnimal"
    CHECK ("TipoAnimal" IN ('Perro', 'Gato')),
    ADD CONSTRAINT "CK_Animal_Edad_NoNegativa"
    CHECK ("Edad" >= 0),
    ADD CONSTRAINT "CK_Animal_Nombre_NoVacio"
    CHECK (char_length(btrim("Nombre")) > 0),
    ADD CONSTRAINT "CK_Animal_Raza_NoVacia"
    CHECK (char_length(btrim("Raza")) > 0);

ALTER TABLE "Animal"
    ALTER COLUMN "Nombre" SET NOT NULL,
    ALTER COLUMN "Raza" SET NOT NULL,
    ALTER COLUMN "Edad" SET NOT NULL,
    ALTER COLUMN "Sexo" SET NOT NULL,
    ALTER COLUMN "FechaIngreso" SET NOT NULL,
    ALTER COLUMN "TipoAnimal" SET NOT NULL;

-- Restricciones DEFAULT
ALTER TABLE "Animal"
    ALTER COLUMN "FechaIngreso" SET DEFAULT CURRENT_DATE;
