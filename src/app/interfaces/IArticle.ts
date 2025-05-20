import User from "../entity/User";

export interface IArticle {
    id: number;
    title: string;
    content: string;
    author: User;
    releaseDate: Date;
    editDate?: Date;
    image?: Blob;
}
