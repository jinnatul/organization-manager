-- -------------------------------------------------------------
-- -------------------------------------------------------------
-- TablePlus 1.2.0
--
-- https://tableplus.com/
--
-- Database: ns
-- Generation Time: (null)
-- -------------------------------------------------------------

-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Sequences
CREATE SEQUENCE IF NOT EXISTS organization.employees_id_seq;

-- Table Definition
CREATE TABLE "organization"."employees" (
    "id" int4 NOT NULL DEFAULT nextval('organization.employees_id_seq'::regclass),
    "name" varchar NOT NULL,
    "position_id" int4 NOT NULL,
    "manager_id" int4,
    "is_deleted" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

INSERT INTO "organization"."employees" ("id","name","position_id","manager_id","is_deleted","created_at","updated_at") VALUES 
(1,'Korim',1,NULL,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(2,'Fahim',2,1,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(3,'Rohim',2,1,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(4,'Himel',3,2,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(5,'Morol',3,2,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(6,'Arif',3,3,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(7,'Amit',4,5,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(8,'Mostafiz',4,5,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(9,'Shova',4,4,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(10,'Babu',4,4,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(11,'Yusuf',5,7,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721'),
(12,'Prantik',6,11,'FALSE','2024-06-12 22:54:18.479721','2024-06-12 22:54:18.479721');

