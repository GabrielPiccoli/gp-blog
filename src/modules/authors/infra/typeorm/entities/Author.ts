import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Article } from "@modules/articles/infra/typeorm/entities/Article";

@Entity("authors")
class Author {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  available: boolean;

  @Column()
  mini_cv: string;

  @Expose({ name: "image_url" })
  image_url(): string {
    return `${process.env.APP_URL}/authors/${this.image}`;
  }

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];

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

export { Author };
