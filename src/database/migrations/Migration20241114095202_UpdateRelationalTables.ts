import { Migration } from '@mikro-orm/migrations';

export class Migration20241114095202_UpdateRelationalTables extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_service_details_id_foreign";`);
    this.addSql(`alter table "user" drop constraint "user_profile_id_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_service_details_id_unique";`);
    this.addSql(`alter table "user" drop constraint "user_profile_id_unique";`);
    this.addSql(`alter table "user" drop column "service_details_id", drop column "profile_id";`);

    this.addSql(`alter table "service_details" add column "user_id" varchar(255) not null;`);
    this.addSql(`alter table "service_details" add constraint "service_details_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "service_details" add constraint "service_details_user_id_unique" unique ("user_id");`);

    this.addSql(`alter table "profile" add column "user_id" varchar(255) not null;`);
    this.addSql(`alter table "profile" add constraint "profile_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "profile" add constraint "profile_user_id_unique" unique ("user_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "service_details" drop constraint "service_details_user_id_foreign";`);

    this.addSql(`alter table "profile" drop constraint "profile_user_id_foreign";`);

    this.addSql(`alter table "service_details" drop constraint "service_details_user_id_unique";`);
    this.addSql(`alter table "service_details" drop column "user_id";`);

    this.addSql(`alter table "profile" drop constraint "profile_user_id_unique";`);
    this.addSql(`alter table "profile" drop column "user_id";`);

    this.addSql(`alter table "user" add column "service_details_id" varchar(255) null, add column "profile_id" varchar(255) null;`);
    this.addSql(`alter table "user" add constraint "user_service_details_id_foreign" foreign key ("service_details_id") references "service_details" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_profile_id_foreign" foreign key ("profile_id") references "profile" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_service_details_id_unique" unique ("service_details_id");`);
    this.addSql(`alter table "user" add constraint "user_profile_id_unique" unique ("profile_id");`);
  }

}
