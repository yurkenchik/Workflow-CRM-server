import { Migration } from '@mikro-orm/migrations';

export class Migration20241117220538_InitialMigration extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "chat_request" drop constraint "FK_61218daedd906fe1ad9f912b92b";`);

    this.addSql(`alter table "user" drop constraint "FK_903d4d5ec9e6e2754f30b39eae1";`);

    this.addSql(`create table "project" ("id" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) not null, "status" text check ("status" in ('Open', 'In progress', 'Closed', 'Completed')) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "project_pkey" primary key ("id"));`);
    this.addSql(`alter table "project" add constraint "project_name_unique" unique ("name");`);

    this.addSql(`create table "task" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "priority" text check ("priority" in ('Low', 'Medium', 'High')) not null, "status" text check ("status" in ('To do', 'Active', 'Inactive', 'In review', 'Done')) not null, "project_id" varchar(255) not null, "due_date" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "task_pkey" primary key ("id"));`);

    this.addSql(`create table "service_details" ("id" varchar(255) not null, "usage_purpose" text check ("usage_purpose" in ('Work', 'Personal', 'Business', 'Education')) not null, "person_best_descriptor" text check ("person_best_descriptor" in ('Business owner')) not null, "company_name" varchar(255) not null, "business_direction" text check ("business_direction" in ('IT and programming')) not null, "team_people_range" varchar(255) not null, "user_id" varchar(255) not null, constraint "service_details_pkey" primary key ("id"));`);

    this.addSql(`create table "member" ("id" varchar(255) not null, "project_id" varchar(255) not null, "user_id" varchar(255) not null, constraint "member_pkey" primary key ("id"));`);

    this.addSql(`create table "task_members" ("task_id" varchar(255) not null, "member_id" varchar(255) not null, constraint "task_members_pkey" primary key ("task_id", "member_id"));`);

    this.addSql(`create table "member_tasks" ("member_id" varchar(255) not null, "task_id" varchar(255) not null, constraint "member_tasks_pkey" primary key ("member_id", "task_id"));`);

    this.addSql(`create table "confirmation_code" ("id" varchar(255) not null, "value" varchar(255) not null, "expires_at" timestamptz not null, "user_id" varchar(255) null, constraint "confirmation_code_pkey" primary key ("id"));`);
    this.addSql(`alter table "confirmation_code" add constraint "confirmation_code_user_id_unique" unique ("user_id");`);

    this.addSql(`create table "user_settings" ("id" varchar(255) not null, "notifications_enabled" boolean not null, "theme" text check ("theme" in ('Dark', 'Light')) not null, constraint "user_settings_pkey" primary key ("id"));`);

    this.addSql(`create table "profile" ("id" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, "full_name" varchar(255) not null, "location" varchar(255) not null, "company" varchar(255) not null, "position" varchar(255) not null, "birth_date" varchar(255) not null, "telegram" varchar(255) null, "linked_in" varchar(255) null, "skype" varchar(255) null, "instagram" varchar(255) null, "facebook" varchar(255) null, "user_settings_id" varchar(255) not null, "user_id" varchar(255) not null, constraint "profile_pkey" primary key ("id"));`);
    this.addSql(`alter table "profile" add constraint "profile_user_settings_id_unique" unique ("user_settings_id");`);
    this.addSql(`alter table "profile" add constraint "profile_user_id_unique" unique ("user_id");`);
    this.addSql(`alter table "profile" add constraint "profile_phone_number_email_unique" unique ("phone_number", "email");`);

    this.addSql(`alter table "task" add constraint "task_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;`);

    this.addSql(`alter table "service_details" add constraint "service_details_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "member" add constraint "member_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;`);
    this.addSql(`alter table "member" add constraint "member_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "task_members" add constraint "task_members_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "task_members" add constraint "task_members_member_id_foreign" foreign key ("member_id") references "member" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "member_tasks" add constraint "member_tasks_member_id_foreign" foreign key ("member_id") references "member" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "member_tasks" add constraint "member_tasks_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "confirmation_code" add constraint "confirmation_code_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "profile" add constraint "profile_user_settings_id_foreign" foreign key ("user_settings_id") references "user_settings" ("id") on update cascade;`);
    this.addSql(`alter table "profile" add constraint "profile_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`drop table if exists "chat" cascade;`);

    this.addSql(`drop table if exists "chat_request" cascade;`);

    this.addSql(`drop table if exists "database_file" cascade;`);

    this.addSql(`drop table if exists "migrations" cascade;`);

    this.addSql(`drop table if exists "saved_place" cascade;`);

    this.addSql(`drop table if exists "token" cascade;`);

    this.addSql(`alter table "user" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "user" drop constraint "REL_903d4d5ec9e6e2754f30b39eae";`);
    this.addSql(`alter table "user" drop column "username", drop column "avatarImageUrl", drop column "isAvatarSet", drop column "confirmationCode", drop column "createdAt", drop column "updatedAt", drop column "fileId", drop column "isAccountVerified";`);

    this.addSql(`alter table "user" add column "phone_number" varchar(255) not null, add column "is_account_verified" boolean not null default false, add column "refresh_token" varchar(255) null, add column "created_at" timestamptz null, add column "updated_at" timestamptz null;`);
    this.addSql(`alter table "user" alter column "id" drop default;`);
    this.addSql(`alter table "user" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "email" type varchar(255) using ("email"::varchar(255));`);
    this.addSql(`alter table "user" alter column "password" type varchar(255) using ("password"::varchar(255));`);
    this.addSql(`alter table "user" add constraint "user_phone_number_unique" unique ("phone_number");`);
    this.addSql(`alter table "user" add constraint "user_email_phone_number_unique" unique ("email", "phone_number");`);
    this.addSql(`alter table "user" drop constraint "UQ_e12875dfb3b1d92d7d7c5377e22";`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "task" drop constraint "task_project_id_foreign";`);

    this.addSql(`alter table "member" drop constraint "member_project_id_foreign";`);

    this.addSql(`alter table "task_members" drop constraint "task_members_task_id_foreign";`);

    this.addSql(`alter table "member_tasks" drop constraint "member_tasks_task_id_foreign";`);

    this.addSql(`alter table "task_members" drop constraint "task_members_member_id_foreign";`);

    this.addSql(`alter table "member_tasks" drop constraint "member_tasks_member_id_foreign";`);

    this.addSql(`alter table "profile" drop constraint "profile_user_settings_id_foreign";`);

    this.addSql(`create table "chat" ("id" uuid not null default uuid_generate_v4(), "userId" uuid null, constraint "PK_9d0b2ba74336710fd31154738a5" primary key ("id"));`);

    this.addSql(`create table "chat_request" ("id" uuid not null default uuid_generate_v4(), "request" varchar not null, "response" varchar not null, "createdAt" timestamp(6) not null default now(), "updatedAt" timestamp(6) not null default now(), "userId" uuid null, "chatId" uuid null, constraint "PK_6f64232d94659df0614c80ffd79" primary key ("id"));`);

    this.addSql(`create table "database_file" ("id" uuid not null default uuid_generate_v4(), "filename" varchar not null, "path" varchar not null, "mimetype" varchar not null, "createdAt" timestamp(6) not null default now(), constraint "PK_6a48e4fea10786b44d274ba8175" primary key ("id"));`);

    this.addSql(`create table "migrations" ("id" serial, "timestamp" int8 not null, "name" varchar not null, constraint "PK_8c82d7f526340ab734260ea46be" primary key ("id"));`);

    this.addSql(`create table "saved_place" ("id" uuid not null default uuid_generate_v4(), "type" varchar null, "properties" jsonb null, "geometry" jsonb null, "userId" uuid null, constraint "PK_b0697c631b48176f23075b54682" primary key ("id"));`);

    this.addSql(`create table "token" ("id" uuid not null default uuid_generate_v4(), "token" varchar not null, "userId" uuid null, constraint "PK_82fae97f905930df5d62a702fc9" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX "REL_94f168faad896c0786646fa3d4" ON public.token USING btree ("userId");`);

    this.addSql(`alter table "chat" add constraint "FK_52af74c7484586ef4bdfd8e4dbb" foreign key ("userId") references "user" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "chat_request" add constraint "FK_4b4269697aabb98adcee7c9e1de" foreign key ("userId") references "user" ("id") on update no action on delete cascade;`);
    this.addSql(`alter table "chat_request" add constraint "FK_61218daedd906fe1ad9f912b92b" foreign key ("chatId") references "chat" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "saved_place" add constraint "FK_3b9a691fcbed7b873bf4920fc1f" foreign key ("userId") references "user" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "token" add constraint "FK_94f168faad896c0786646fa3d4a" foreign key ("userId") references "user" ("id") on update no action on delete cascade;`);

    this.addSql(`drop table if exists "project" cascade;`);

    this.addSql(`drop table if exists "task" cascade;`);

    this.addSql(`drop table if exists "service_details" cascade;`);

    this.addSql(`drop table if exists "member" cascade;`);

    this.addSql(`drop table if exists "task_members" cascade;`);

    this.addSql(`drop table if exists "member_tasks" cascade;`);

    this.addSql(`drop table if exists "confirmation_code" cascade;`);

    this.addSql(`drop table if exists "user_settings" cascade;`);

    this.addSql(`drop table if exists "profile" cascade;`);

    this.addSql(`alter table "user" drop constraint "user_phone_number_unique";`);
    this.addSql(`alter table "user" drop constraint "user_email_phone_number_unique";`);
    this.addSql(`alter table "user" drop column "phone_number", drop column "refresh_token", drop column "created_at", drop column "updated_at";`);

    this.addSql(`alter table "user" add column "username" varchar not null, add column "avatarImageUrl" varchar null, add column "confirmationCode" varchar null, add column "createdAt" timestamp(6) not null default now(), add column "updatedAt" timestamp(6) not null default now(), add column "fileId" uuid null, add column "isAccountVerified" bool not null default false;`);
    this.addSql(`alter table "user" alter column "id" drop default;`);
    this.addSql(`alter table "user" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "user" alter column "id" set default uuid_generate_v4();`);
    this.addSql(`alter table "user" alter column "email" type varchar using ("email"::varchar);`);
    this.addSql(`alter table "user" alter column "password" type varchar using ("password"::varchar);`);
    this.addSql(`alter table "user" add constraint "FK_903d4d5ec9e6e2754f30b39eae1" foreign key ("fileId") references "database_file" ("id") on update no action on delete no action;`);
    this.addSql(`alter table "user" rename column "is_account_verified" to "isAvatarSet";`);
    this.addSql(`CREATE UNIQUE INDEX "REL_903d4d5ec9e6e2754f30b39eae" ON public."user" USING btree ("fileId");`);
    this.addSql(`alter table "user" drop constraint "user_email_unique";`);
    this.addSql(`alter table "user" add constraint "UQ_e12875dfb3b1d92d7d7c5377e22" unique ("email");`);
  }

}
