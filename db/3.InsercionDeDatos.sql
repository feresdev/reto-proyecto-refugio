\connect refugiodb

-- Hash bcrypt de la contraseña feresdev123, generado con 8 rondas.
INSERT INTO "Administrador" ("Identificador", "Usuario", "Contrasena")
VALUES (1, 'feresdev', '$2b$08$EOeZPOsEyuokysrQU1sOH.yMX9F.cKbmxwL5vIiMjFUq9ibopPvl6');

INSERT INTO "Animal"
    ("Identificador", "Nombre", "Raza", "Edad", "Sexo", "TipoAnimal")
VALUES
    (1,  'Michi',  'Europeo común',  2, 'Hembra', 'Gato'),
    (2,  'Luna',   'Siamés',         3, 'Hembra', 'Gato'),
    (3,  'Simba',  'Persa',          4, 'Macho',  'Gato'),
    (4,  'Nala',   'Angora',         1, 'Hembra', 'Gato'),
    (5,  'Tom',    'Azul ruso',      5, 'Macho',  'Gato'),
    (6,  'Max',    'Labrador',       3, 'Macho',  'Perro'),
    (7,  'Bella',  'Golden Retriever', 2, 'Hembra', 'Perro'),
    (8,  'Rocky',  'Pastor alemán',  4, 'Macho',  'Perro'),
    (9,  'Coco',   'Beagle',         1, 'Hembra', 'Perro'),
    (10, 'Thor',   'Bulldog',        6, 'Macho',  'Perro');
