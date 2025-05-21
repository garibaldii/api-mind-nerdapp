import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Article from "./Article";

@Entity("users")
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 50, nullable: true })
    name?: string;

    @Column('varchar', { length: 100, nullable: false })
    email: string;

    @Column('varchar', { length: 100, nullable: false })
    password: string;

    @OneToMany(() => Article, (article) => article.author)
    articles?: Article[];

    constructor( email: string, password: string, articles?: Article[], name?: string,) {
        this.email = email;
        this.password = password;
        this.articles = articles;
        this.name = name
    }
}

export default User;
