import { Migration } from '@mikro-orm/migrations';

export class Migration20241119120206_AddUserTableEmailIndex extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create index "user_email_index" on "user" ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index "user_email_index";`);
  }

}
