import { Migration } from '@mikro-orm/migrations';

export class Migration20241114104544_UpdateUserTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "created_at" timestamptz not null default now();`);
    this.addSql(`alter table "user" add column "updated_at" timestamptz not null default now();`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "created_at";`);
    this.addSql(`alter table "user" drop column "updated_at";`);
  }

}
