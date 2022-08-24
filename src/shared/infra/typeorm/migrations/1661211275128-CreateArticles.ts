import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArticles1661211275128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "articles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "image",
            type: "varchar",
          },
          {
            name: "content",
            type: "varchar",
          },
          {
            name: "author_id",
            type: "uuid",
          },
          {
            name: "abstract",
            type: "varchar",
          },
          {
            name: "available",
            type: "boolean",
            default: true,
          },
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKArticleAuthor",
            referencedTableName: "authors",
            referencedColumnNames: ["id"],
            columnNames: ["author_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("articles");
  }
}
