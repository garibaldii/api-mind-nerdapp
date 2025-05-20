import Article from "../entity/Article"

export interface IUser {
    id?: number,
    name: string,
    email: string,
    password: string
    articles?: Article[]
}