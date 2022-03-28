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

const existsUsername = async (username: string): Promise<boolean> => {
    const user: typeof UserModel|null = await UserModel.findOne({ username: username });
    return !!user
}

const findUsers = async ():Promise<typeof UserModel[]> => {
    return await UserModel.find();
}
export { createUser, existsEmail, existsUsername, findUsers }