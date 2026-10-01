CREATE DATABASE refugiodb;

\connect refugiodb

CREATE TABLE "Administrador" (
    "Identificador" INTEGER,
    "Usuario" TEXT,
    "Contrasena" TEXT
);

CREATE TABLE "Animal" (
    "Identificador" INTEGER,
    "Nombre" TEXT,
    "Raza" TEXT,
    "Edad" INTEGER,
    "Sexo" TEXT,
    "FechaIngreso" DATE,
    "TipoAnimal" TEXT
);
