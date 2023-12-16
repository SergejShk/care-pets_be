CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar NOT NULL,
	"city" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"birthday" timestamp,
	"photo" varchar
);
