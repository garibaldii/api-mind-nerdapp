import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import User from "./User"

@Entity()
class Article {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.articles)
    author: User

    @Column()
    releaseDate: Date

    @Column({ type: 'datetime', nullable: true })
    editDate?: Date

    @Column({ type: 'blob', nullable: true })
    image?: Buffer

    constructor(
        title: string,
        content: string,
        author: User,
        image?: Buffer,
        editDate?: Date,
    ) {
        this.title = title
        this.content = content
        this.author = author
        this.releaseDate = new Date()
        if (editDate) this.editDate = editDate
        if (image) this.image = image
    }
}

export default Article
