
import { AppDataSource } from "../../database/data-source";
import User from "../entity/User";
import { IUser } from "../interfaces/IUser";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<User[]> => {
    return userRepository.find({
        relations: ["articles"]
    });
}

const postUser = async (user: IUser): Promise<User> => {
    return userRepository.save(user);
}

const getUserByEmail = async (email: string): Promise<User> => {
    return userRepository.findOne({
        where: { email },
        relations: ["articles"]
    })
}

const getUserById = async (id: number): Promise<User> => {
    return userRepository.findOne({
        where: { id },
        relations: ["articles"]
    })
}

export default { getUsers, postUser, getUserByEmail, getUserById };