import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Article } from "./Article"

@Entity("users")
class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 100, nullable: false })
    name: string

    @Column('varchar', { length: 100, nullable: false })
    email: string

    @Column('varchar', { length: 100, nullable: false })
    password: string

    @Column()
    articles?: Article[]


    constructor(name: string, email: string, password: string, articles?: Article[]) {
        this.name = name
        this.email = email
        this.password = password
        this.articles = articles
    }
}


export default User