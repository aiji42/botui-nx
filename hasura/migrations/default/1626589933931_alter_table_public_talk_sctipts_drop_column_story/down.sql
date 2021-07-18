alter table "public"."talk_sctipts" alter column "story" set default jsonb_build_array();
alter table "public"."talk_sctipts" alter column "story" drop not null;
alter table "public"."talk_sctipts" add column "story" jsonb;
