
DROP TABLE "public"."scripts";

alter table "public"."talk_sctipts" alter column "strategy" drop not null;
alter table "public"."talk_sctipts" add column "strategy" text;

alter table "public"."talk_sctipts" alter column "story" set default jsonb_build_array();
alter table "public"."talk_sctipts" alter column "story" drop not null;
alter table "public"."talk_sctipts" add column "story" jsonb;

alter table "public"."talk_sctipts" rename to "stories";
