import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArticlesCategories1661212499406
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "articles_categories_categories",
        columns: [
          {
            name: "articlesId",
            type: "uuid",
          },
          {
            name: "categoriesId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKArticleCategory",
            referencedTableName: "articles",
            referencedColumnNames: ["id"],
            columnNames: ["articlesId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKCategoryArticle",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["categoriesId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("articles_categories_categories");
  }
}
