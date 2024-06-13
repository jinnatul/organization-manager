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
CREATE SEQUENCE IF NOT EXISTS organization.positions_id_seq;

-- Table Definition
CREATE TABLE "organization"."positions" (
    "id" int4 NOT NULL DEFAULT nextval('organization.positions_id_seq'::regclass),
    "name" varchar NOT NULL,
    "is_deleted" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

INSERT INTO "organization"."positions" ("id","name","is_deleted","created_at","updated_at") VALUES 
(1,'CTO','FALSE','2024-06-12 22:43:30.144064','2024-06-12 22:43:30.144064'),
(2,'Senior Software Engineer','FALSE','2024-06-12 22:43:30.144064','2024-06-12 22:43:30.144064'),
(3,'Software Engineer','FALSE','2024-06-12 22:43:30.144064','2024-06-12 22:43:30.144064'),
(4,'Junior Software Engineer','FALSE','2024-06-12 22:43:30.144064','2024-06-12 22:43:30.144064'),
(5,'Trainee Software Engineer','FALSE','2024-06-12 22:43:30.144064','2024-06-12 22:43:30.144064'),
(6,'Intern Software Engineer','FALSE','2024-06-12 22:43:30.144064','2024-06-12 22:43:30.144064');

