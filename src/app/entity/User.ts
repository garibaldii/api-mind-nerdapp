import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import Article from "./Article";

@Entity("users")
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 50, nullable: true })
    name?: string;

    @Column('varchar', { length: 100, nullable: false })
    email: string;

    @Column('varchar', { length: 100, nullable: false, })
    password: string;

    @OneToMany(() => Article, (article) => article.author)
    articles?: Article[];

    @ManyToMany(() => Article, { cascade: true })
    @JoinTable()
    likedArticles?: Article[]

    @Column({ type: 'longblob', nullable: true })
    photo?: Buffer

    constructor(email: string, password: string, articles?: Article[], name?: string, photo?: Buffer, likedArticles?: Article[]) {
        this.email = email;
        this.password = password;
        this.articles = articles;
        this.name = name
        if (photo) this.photo = photo
        if (likedArticles) this.likedArticles = likedArticles
    }
}

export default User;
