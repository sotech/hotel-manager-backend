import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';

interface User {
  email: string,
  password: string,
  username: string
}

const userList: User[] = []

const registerUser = async(req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const {username, email, password} = req.body;
  const user:User = {
    username,
    email,
    password: await bcrypt.hash(password,10)
  }
  userList.push(user)
  res.status(201).json({ msg: "Success", user })
};

const logUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ msg: "Logged in" })
}

const getUsers = (req:Request,res:Response,next:NextFunction) => {
  if(userList.length == 0){
    res.status(404).json({msg: "No users found"});
    return;
  }
  res.status(200).json({msg: "Success", amount: userList.length, data: userList});
}

export { registerUser, logUser, getUsers }