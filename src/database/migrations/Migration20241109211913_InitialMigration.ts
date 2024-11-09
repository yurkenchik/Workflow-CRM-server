import { Migration } from '@mikro-orm/migrations';

export class Migration20241109211913_InitialMigration extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "project" ("id" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) not null, "status" text check ("status" in ('Open', 'In progress', 'Closed', 'Completed')) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "project_pkey" primary key ("id"));`);
    this.addSql(`alter table "project" add constraint "project_name_unique" unique ("name");`);

    this.addSql(`create table "service_details" ("id" varchar(255) not null, "usage_purpose" text check ("usage_purpose" in ('Work', 'Personal', 'Business', 'Education')) not null, "person_best_descriptor" text check ("person_best_descriptor" in ('Business owner')) not null, "company_name" varchar(255) not null, "business_direction" text check ("business_direction" in ('IT and programming')) not null, "team_people_range" varchar(255) not null, constraint "service_details_pkey" primary key ("id"));`);

    this.addSql(`create table "task" ("id" varchar(255) not null, "title" varchar(255) not null, "description" varchar(255) not null, "priority" text check ("priority" in ('Low', 'Medium', 'High')) not null, "project_id" varchar(255) not null, "due_date" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "task_pkey" primary key ("id"));`);

    this.addSql(`create table "user_settings" ("id" varchar(255) not null, "notifications_enabled" boolean not null, "theme" text check ("theme" in ('Dark', 'Light')) not null, constraint "user_settings_pkey" primary key ("id"));`);

    this.addSql(`create table "profile" ("id" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, "full_name" varchar(255) not null, "location" varchar(255) not null, "company" varchar(255) not null, "position" varchar(255) not null, "birth_date" varchar(255) not null, "telegram" varchar(255) null, "linked_in" varchar(255) null, "skype" varchar(255) null, "instagram" varchar(255) null, "facebook" varchar(255) null, "user_settings_id" varchar(255) not null, constraint "profile_pkey" primary key ("id"));`);
    this.addSql(`alter table "profile" add constraint "profile_email_unique" unique ("email");`);
    this.addSql(`alter table "profile" add constraint "profile_phone_number_unique" unique ("phone_number");`);
    this.addSql(`alter table "profile" add constraint "profile_user_settings_id_unique" unique ("user_settings_id");`);
    this.addSql(`alter table "profile" add constraint "profile_phone_number_email_unique" unique ("phone_number", "email");`);

    this.addSql(`create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, "confirmation_code" varchar(255) not null, "password" varchar(255) not null, "service_details_id" varchar(255) not null, "profile_id" varchar(255) not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
    this.addSql(`alter table "user" add constraint "user_phone_number_unique" unique ("phone_number");`);
    this.addSql(`alter table "user" add constraint "user_service_details_id_unique" unique ("service_details_id");`);
    this.addSql(`alter table "user" add constraint "user_profile_id_unique" unique ("profile_id");`);
    this.addSql(`alter table "user" add constraint "user_email_phone_number_unique" unique ("email", "phone_number");`);

    this.addSql(`create table "member" ("id" varchar(255) not null, "project_id" varchar(255) not null, "user_id" varchar(255) not null, constraint "member_pkey" primary key ("id"));`);

    this.addSql(`create table "task_members" ("task_id" varchar(255) not null, "member_id" varchar(255) not null, constraint "task_members_pkey" primary key ("task_id", "member_id"));`);

    this.addSql(`create table "member_tasks" ("member_id" varchar(255) not null, "task_id" varchar(255) not null, constraint "member_tasks_pkey" primary key ("member_id", "task_id"));`);

    this.addSql(`alter table "task" add constraint "task_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;`);

    this.addSql(`alter table "profile" add constraint "profile_user_settings_id_foreign" foreign key ("user_settings_id") references "user_settings" ("id") on update cascade;`);

    this.addSql(`alter table "user" add constraint "user_service_details_id_foreign" foreign key ("service_details_id") references "service_details" ("id") on update cascade;`);
    this.addSql(`alter table "user" add constraint "user_profile_id_foreign" foreign key ("profile_id") references "profile" ("id") on update cascade;`);

    this.addSql(`alter table "member" add constraint "member_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;`);
    this.addSql(`alter table "member" add constraint "member_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "task_members" add constraint "task_members_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "task_members" add constraint "task_members_member_id_foreign" foreign key ("member_id") references "member" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "member_tasks" add constraint "member_tasks_member_id_foreign" foreign key ("member_id") references "member" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "member_tasks" add constraint "member_tasks_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "task" drop constraint "task_project_id_foreign";`);

    this.addSql(`alter table "member" drop constraint "member_project_id_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_service_details_id_foreign";`);

    this.addSql(`alter table "task_members" drop constraint "task_members_task_id_foreign";`);

    this.addSql(`alter table "member_tasks" drop constraint "member_tasks_task_id_foreign";`);

    this.addSql(`alter table "profile" drop constraint "profile_user_settings_id_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_profile_id_foreign";`);

    this.addSql(`alter table "member" drop constraint "member_user_id_foreign";`);

    this.addSql(`alter table "task_members" drop constraint "task_members_member_id_foreign";`);

    this.addSql(`alter table "member_tasks" drop constraint "member_tasks_member_id_foreign";`);

    this.addSql(`drop table if exists "project" cascade;`);

    this.addSql(`drop table if exists "service_details" cascade;`);

    this.addSql(`drop table if exists "task" cascade;`);

    this.addSql(`drop table if exists "user_settings" cascade;`);

    this.addSql(`drop table if exists "profile" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "member" cascade;`);

    this.addSql(`drop table if exists "task_members" cascade;`);

    this.addSql(`drop table if exists "member_tasks" cascade;`);
  }

}
