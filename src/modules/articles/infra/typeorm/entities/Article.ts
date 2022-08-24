import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Author } from "@modules/authors/infra/typeorm/entities/Author";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";

@Entity("articles")
class Article {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Expose({ name: "image_url" })
  image_url(): string {
    return `${process.env.APP_URL}/articles/${this.image}`;
  }

  @Column()
  content: string;

  @Column()
  author_id: string;

  @ManyToOne(() => Author, (author) => author.articles)
  @JoinColumn({ name: "author_id" })
  author: Author;

  @Column()
  abstract: string;

  @Column()
  available: boolean;

  @Column()
  slug: string;

  @ManyToMany(() => Category, (category) => category.articles)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Article };
