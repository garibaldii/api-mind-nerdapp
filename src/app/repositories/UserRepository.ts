
import { AppDataSource } from "../../database/data-source";
import User from "../entity/User";
import { IUser } from "../interfaces/IUser";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find();
}

 const postUser = async (user: User): Promise<IUser> => {
    return userRepository.save(user);
}

 const getUserByEmail = async (email: string): Promise<IUser> => {
    return userRepository.findOne({
        where: {email},
    })
}

export default { getUsers, postUser, getUserByEmail };