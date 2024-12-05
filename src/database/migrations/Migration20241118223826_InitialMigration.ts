import { Migration } from '@mikro-orm/migrations';

export class Migration20241118223826_InitialMigration extends Migration {

  override async up(): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "user_settings" (
                                                   "id" UUID PRIMARY KEY,
                                                   "notifications_enabled" BOOLEAN NOT NULL,
                                                   "theme" VARCHAR NOT NULL
      );
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS "user" (
                                          "id" UUID PRIMARY KEY,
                                          "email" VARCHAR NOT NULL UNIQUE,
                                          "phone_number" VARCHAR NOT NULL UNIQUE,
                                          "password" VARCHAR NOT NULL,
                                          "is_account_verified" BOOLEAN NOT NULL DEFAULT false,
                                          "refresh_token" VARCHAR NULL,
                                          "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
        );
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS "service_details" (
                                                     "id" UUID PRIMARY KEY,
                                                     "usage_purpose" VARCHAR NOT NULL,
                                                     "person_best_descriptor" VARCHAR NOT NULL,
                                                     "company_name" VARCHAR NULL,
                                                     "business_direction" VARCHAR NOT NULL,
                                                     "team_people_range" VARCHAR NULL,
                                                     "user_id" UUID NULL UNIQUE,
                                                     CONSTRAINT "service_details_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE
        );
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS "confirmation_code" (
                                                       "id" UUID PRIMARY KEY,
                                                       "value" VARCHAR NOT NULL,
                                                       "expires_at" TIMESTAMPTZ NOT NULL,
                                                       "user_id" UUID NULL UNIQUE,
                                                       CONSTRAINT "confirmation_code_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL
        );
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS "profile" (
                                             "id" UUID PRIMARY KEY,
                                             "email" VARCHAR NOT NULL,
                                             "phone_number" VARCHAR NOT NULL,
                                             "full_name" VARCHAR NOT NULL,
                                             "location" VARCHAR NOT NULL,
                                             "company" VARCHAR NOT NULL,
                                             "position" VARCHAR NOT NULL,
                                             "birth_date" VARCHAR NOT NULL,
                                             "telegram" VARCHAR NULL,
                                             "linked_in" VARCHAR NULL,
                                             "skype" VARCHAR NULL,
                                             "instagram" VARCHAR NULL,
                                             "facebook" VARCHAR NULL,
                                             "user_settings_id" UUID UNIQUE,
                                             "user_id" UUID NOT NULL UNIQUE,
                                             CONSTRAINT "profile_user_settings_id_foreign" FOREIGN KEY ("user_settings_id") REFERENCES "user_settings" ("id") ON DELETE CASCADE,
        CONSTRAINT "profile_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE
        );
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS "project" (
                                             "id" UUID PRIMARY KEY,
                                             "name" VARCHAR NOT NULL UNIQUE,
                                             "description" VARCHAR NOT NULL,
                                             "status" VARCHAR NOT NULL,
                                             "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
        );
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS "member" (
                                            "id" UUID PRIMARY KEY,
                                            "project_id" UUID NOT NULL,
                                            "user_id" UUID NOT NULL,
                                            CONSTRAINT "member_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "project" ("id") ON DELETE CASCADE,
        CONSTRAINT "member_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE
        );
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS "task" (
                                          "id" UUID PRIMARY KEY,
                                          "title" VARCHAR NOT NULL,
                                          "description" VARCHAR NOT NULL,
                                          "priority" VARCHAR NOT NULL,
                                          "status" VARCHAR NOT NULL,
                                          "project_id" UUID NOT NULL,
                                          "due_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "task_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "project" ("id") ON DELETE CASCADE
        );
    `);

    this.addSql(`
        CREATE TABLE IF NOT EXISTS "task_members" (
                                                  "task_id" UUID NOT NULL,
                                                  "member_id" UUID NOT NULL,
                                                  PRIMARY KEY ("task_id", "member_id"),
        CONSTRAINT "task_members_task_id_foreign" FOREIGN KEY ("task_id") REFERENCES "task" ("id") ON DELETE CASCADE,
        CONSTRAINT "task_members_member_id_foreign" FOREIGN KEY ("member_id") REFERENCES "member" ("id") ON DELETE CASCADE
        );
    `);
  }

  override async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "task_members";');
    this.addSql('DROP TABLE IF EXISTS "task";');
    this.addSql('DROP TABLE IF EXISTS "member";');
    this.addSql('DROP TABLE IF EXISTS "project";');
    this.addSql('DROP TABLE IF EXISTS "user_settings" CASCADE;');
    this.addSql('DROP TABLE IF EXISTS "profile";');
    this.addSql('DROP TABLE IF EXISTS "confirmation_code";');
    this.addSql('DROP TABLE IF EXISTS "service_details";');
    this.addSql('DROP TABLE IF EXISTS "user";');
  }
}
