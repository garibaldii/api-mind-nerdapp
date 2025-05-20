import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import User from "./User"



@Entity()
class Article {

    @PrimaryGeneratedColumn()
    id: number


    @Column()
    title: string

    @Column()
    content: string

    @Column()
    author: User

    @Column()
    releaseDate: Date

    @Column()
    editDate?: Date

    @Column()
    image?: Blob


}

export default Article