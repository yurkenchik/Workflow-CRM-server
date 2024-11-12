import { Migration } from '@mikro-orm/migrations';

export class Migration20241112175646_UpdateUserTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "confirmation_code" ("id" varchar(255) not null, "value" varchar(255) not null, "expires_at" timestamptz not null, constraint "confirmation_code_pkey" primary key ("id"));`);

    this.addSql(`alter table "task" add column "status" text check ("status" in ('To do', 'Active', 'Inactive', 'In review', 'Done')) not null;`);

    this.addSql(`alter table "user" add column "is_account_verified" boolean not null default false, add column "confirmation_code_id" varchar(255) not null;`);
    this.addSql(`alter table "user" add constraint "user_confirmation_code_id_foreign" foreign key ("confirmation_code_id") references "confirmation_code" ("id") on update cascade;`);
    this.addSql(`alter table "user" rename column "confirmation_code" to "refresh_token";`);
    this.addSql(`alter table "user" add constraint "user_confirmation_code_id_unique" unique ("confirmation_code_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_confirmation_code_id_foreign";`);

    this.addSql(`drop table if exists "confirmation_code" cascade;`);

    this.addSql(`alter table "task" drop column "status";`);

    this.addSql(`alter table "user" drop constraint "user_confirmation_code_id_unique";`);
    this.addSql(`alter table "user" drop column "is_account_verified", drop column "confirmation_code_id";`);

    this.addSql(`alter table "user" rename column "refresh_token" to "confirmation_code";`);
  }

}
