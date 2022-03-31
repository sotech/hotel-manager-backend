import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { UserType } from "../types/types";
import { createUser, existsEmail, findUsers, deleteUserAPI } from "../api/user";
import { UserModel } from "../models/user";
import { sendMail } from "../utils/mailer";
import { validationResult } from "express-validator";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, fullname } = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.status(422).json({msg:errors.array()[0].msg});
    return;
  }

  const user: UserType = {
    email,
    password: await bcrypt.hash(password, 10),
    fullname
  }

  if (await existsEmail(email)) {
    res.status(400).json({ msg: "Error. Email en uso", code: 'ERROR_EMAIL_USED' })
    return;
  }

  const userCreated = await createUser(user);
  if (userCreated){
    //Mail al usuario
    sendMail({
      to: user.email,
      subject: 'Usuario creado',
      html: `Usuario creado. Datos:
            <ul>
            <li>Nombre completo:${user.fullname}</li>
            <li>Email:${user.email}</li>
            </ul>
      `
    })
    //Mail al administrador
    sendMail({
      to: 'hotel.notifier@gmail.com',
      subject: 'Usuario creado',
      html: `Usuario creado. Datos:
            <ul>
            <li>Nombre completo:${user.fullname}</li>
            <li>Email:${user.email}</li>
            </ul>
      `
    })
    res.status(201).json({ msg: "Exito"})
  }
  else
    res.status(500).json({ msg: "Error"})
};

const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const resp = await deleteUserAPI(id);
  if(resp.deletedCount > 0){
    res.status(200).json({msg:"Usuario borrado"})
  }else{
    res.status(404).json({msg:"No se encontro el usuario"})
  }
}

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

export { registerUser, logUser, getUsers, deleteUser }