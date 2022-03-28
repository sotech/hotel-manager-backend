import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { UserType } from "../types/types";
import { createUser, existsEmail, existsUsername, findUsers } from "../api/user";
import { UserModel } from "../models/user";


const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, fullname } = req.body;
  const user: UserType = {
    username,
    email,
    password: await bcrypt.hash(password, 10),
    fullname
  }

  if (await existsEmail(email)) {
    res.status(400).json({ msg: "Error. Email en uso" })
    return;
  }

  if (await existsUsername(username)) {
    res.status(400).json({ msg: "Error. Username en uso" })
    return;
  }

  const userCreated = await createUser(user);
  if (userCreated)
    res.status(201).json({ msg: "Exito", userCreated })
  else
    res.status(500).json({ msg: "Error", userCreated })
};

const logUser = (req: Request, res: Response, next: NextFunction) => {
  //Verificar que el usuario exista
  //Verificar que la contraseña sea igual
  res.status(200).json({ msg: "Logged in" })
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const userList: typeof UserModel[] = await findUsers();
  if (userList.length == 0) {
    res.status(404).json({ msg: "No se encontraron usuarios" });
    return;
  }
  res.status(200).json({
    msg: "Exito",
    data: {
      list: userList,
      amount: userList.length
    }
  });
}

export { registerUser, logUser, getUsers }