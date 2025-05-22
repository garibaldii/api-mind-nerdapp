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

    @Column('varchar', { length: 100, nullable: false,})
    password: string;

    @OneToMany(() => Article, (article) => article.author)
    articles?: Article[];

    @Column({ type: 'longblob', nullable: true })
    photo?: Buffer

    constructor(email: string, password: string, articles?: Article[], name?: string, photo?: Buffer) {
        this.email = email;
        this.password = password;
        this.articles = articles;
        this.name = name
        if (photo) this.photo = photo
    }
}

export default User;
