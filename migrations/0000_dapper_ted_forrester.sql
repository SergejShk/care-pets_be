CREATE TABLE IF NOT EXISTS "pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"birthday" timestamp NOT NULL,
	"breed" varchar NOT NULL,
	"photo" json,
	"comments" varchar NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"name" varchar NOT NULL,
	"city" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"birthday" timestamp,
	"photo" json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
