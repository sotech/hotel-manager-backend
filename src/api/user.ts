import { UserModel } from "../models/user";
import { UserType } from "../types/types";

const createUser = async (userData: UserType): Promise<UserType> => {
    const newUser: UserType = await UserModel.create(userData);
    return newUser;
}

const existsEmail = async (email: string): Promise<boolean> => {
    const user: typeof UserModel|null = await UserModel.findOne({ email: email });
    return !!user
}

const getUserByEmail = async(email:string):Promise<UserType|null> => {
    const user:UserType|null = await UserModel.findOne({ email: email });
    return user;
}

const findUsers = async():Promise<UserType[]> => {
    return await UserModel.find();
}

const deleteUserAPI = async (id:string) => {
    return await UserModel.deleteOne({_id:id})
}
export { createUser, existsEmail, findUsers, deleteUserAPI, getUserByEmail }