CREATE TABLE "public"."scripts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "talk_script_id" uuid NOT NULL, "follow_script_id" uuid NOT NULL, "snippet" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
