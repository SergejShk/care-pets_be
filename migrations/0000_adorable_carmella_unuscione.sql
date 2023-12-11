CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar NOT NULL,
	"city" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"birthday" varchar,
	"photo" varchar
);
