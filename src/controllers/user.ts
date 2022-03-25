import { Request, Response, NextFunction } from "express";

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.status(201).json({ msg: "Success" })
};

const logUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ msg: "Logged in" })
}

export { registerUser, logUser }