import { Migration } from '@mikro-orm/migrations';

export class Migration20241113000108_UpdateUserTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_service_details_id_foreign";`);
    this.addSql(`alter table "user" drop constraint "user_profile_id_foreign";`);
    this.addSql(`alter table "user" drop constraint "user_confirmation_code_id_foreign";`);

    this.addSql(`alter table "user" alter column "service_details_id" type varchar(255) using ("service_details_id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "service_details_id" drop not null;`);
    this.addSql(`alter table "user" alter column "profile_id" type varchar(255) using ("profile_id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "profile_id" drop not null;`);
    this.addSql(`alter table "user" alter column "confirmation_code_id" type varchar(255) using ("confirmation_code_id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "confirmation_code_id" drop not null;`);
    this.addSql(`alter table "user" add constraint "user_service_details_id_foreign" foreign key ("service_details_id") references "service_details" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_profile_id_foreign" foreign key ("profile_id") references "profile" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_confirmation_code_id_foreign" foreign key ("confirmation_code_id") references "confirmation_code" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_service_details_id_foreign";`);
    this.addSql(`alter table "user" drop constraint "user_profile_id_foreign";`);
    this.addSql(`alter table "user" drop constraint "user_confirmation_code_id_foreign";`);

    this.addSql(`alter table "user" alter column "service_details_id" type varchar(255) using ("service_details_id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "service_details_id" set not null;`);
    this.addSql(`alter table "user" alter column "profile_id" type varchar(255) using ("profile_id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "profile_id" set not null;`);
    this.addSql(`alter table "user" alter column "confirmation_code_id" type varchar(255) using ("confirmation_code_id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "confirmation_code_id" set not null;`);
    this.addSql(`alter table "user" add constraint "user_service_details_id_foreign" foreign key ("service_details_id") references "service_details" ("id") on update cascade;`);
    this.addSql(`alter table "user" add constraint "user_profile_id_foreign" foreign key ("profile_id") references "profile" ("id") on update cascade;`);
    this.addSql(`alter table "user" add constraint "user_confirmation_code_id_foreign" foreign key ("confirmation_code_id") references "confirmation_code" ("id") on update cascade;`);
  }

}
