import { Migration } from '@mikro-orm/migrations';

export class Migration20241205210948_UpdateMemberTable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "member" add column "name" varchar(255) not null, add column "avatar_image_url" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "member" drop column "name", drop column "avatar_image_url";`);
  }

}
