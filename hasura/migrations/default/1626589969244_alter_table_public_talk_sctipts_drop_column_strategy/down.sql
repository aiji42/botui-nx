alter table "public"."talk_sctipts" alter column "strategy" drop not null;
alter table "public"."talk_sctipts" add column "strategy" text;
