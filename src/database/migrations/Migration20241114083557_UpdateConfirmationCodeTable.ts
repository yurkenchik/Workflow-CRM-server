import { Migration } from '@mikro-orm/migrations';

export class Migration20241114083557_UpdateConfirmationCodeTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_confirmation_code_id_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_confirmation_code_id_unique";`);
    this.addSql(`alter table "user" drop column "confirmation_code_id";`);

    this.addSql(`alter table "confirmation_code" add column "user_id" varchar(255) null;`);
    this.addSql(`alter table "confirmation_code" add constraint "confirmation_code_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "confirmation_code" add constraint "confirmation_code_user_id_unique" unique ("user_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "confirmation_code" drop constraint "confirmation_code_user_id_foreign";`);

    this.addSql(`alter table "confirmation_code" drop constraint "confirmation_code_user_id_unique";`);
    this.addSql(`alter table "confirmation_code" drop column "user_id";`);

    this.addSql(`alter table "user" add column "confirmation_code_id" varchar(255) null;`);
    this.addSql(`alter table "user" add constraint "user_confirmation_code_id_foreign" foreign key ("confirmation_code_id") references "confirmation_code" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "user" add constraint "user_confirmation_code_id_unique" unique ("confirmation_code_id");`);
  }

}
