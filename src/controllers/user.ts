import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { UserType } from "../types/types";
import { createUser, existsEmail, findUsers, deleteUserAPI, getUserByEmail } from "../api/user";
import { notificarUsuarioCreadoAdmin, notificarUsuarioCreadoUsuario } from "../utils/mailer";
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

  const userCreated:UserType = await createUser(user);
  if (userCreated){
    notificarUsuarioCreadoAdmin(userCreated);
    notificarUsuarioCreadoUsuario(userCreated);
    res.status(201).json({ msg: "Exito"})
  }
  else
    res.status(500).json({ msg: "Error al crear usuario" })
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

const logUser = async(req: Request, res: Response, next: NextFunction) => {
  //extraer user y pass del cuerpo de la peticion
  const { email, password } = req.body;
  //obtener usuario por email
  const user: UserType|null = await getUserByEmail(email);
  //comprobar si existe
  if (!user) {
    res.status(404).json({ msg: "Error. Usuario no encontrado", code: 'ERROR_USER_NOT_FOUND' })
    return;
  }
  //comprobar password
  if(!bcrypt.compareSync(password, user.password)){
    res.status(400).json({ msg: "Error. Contraseña incorrecta", code: 'ERROR_PASSWORD_INCORRECT' })
    return;
  }  
  res.status(200).json({ msg: "Logged in" })
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const userList:UserType[] = await findUsers();
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