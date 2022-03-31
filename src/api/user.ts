import { UserModel } from "../models/user";
import { UserType } from "../types/types";

const createUser = async (userData: UserType): Promise<typeof UserModel> => {
    const newUser: typeof UserModel = await UserModel.create(userData);
    return newUser;
}

const existsEmail = async (email: string): Promise<boolean> => {
    const user: typeof UserModel|null = await UserModel.findOne({ email: email });
    return !!user
}

const findUsers = async ():Promise<typeof UserModel[]> => {
    return await UserModel.find();
}

const deleteUserAPI = async (id:string) => {
    return await UserModel.deleteOne({_id:id})
}
export { createUser, existsEmail, findUsers, deleteUserAPI }