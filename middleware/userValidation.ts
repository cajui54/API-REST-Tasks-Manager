import { body } from "express-validator";
import { UserModel } from "../models/User.model";
import { Request, Response, NextFunction } from "express";
export const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O campo nome é obrigatório!")
      .isLength({ min: 5 })
      .withMessage("Campo nome deve conter ao menos 5 caracteres!"),
    body("email")
      .isString()
      .withMessage("O campo email é obrigatório!")
      .isEmail()
      .withMessage("Não é um email valido!"),

    body("password")
      .isString()
      .withMessage("O campo senha é obrigatório!")
      .isLength({ min: 6 })
      .withMessage("O campo senha deve conter ao meno 6 caracteres"),
  ];
};

export const checkIfExistEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;
  const users = await UserModel.find();

  if (users.length > 0) {
    const emails = users.map((user) => user.email);

    if (emails.includes(email)) {
      return response.status(400).json({ error: "Esse email já existe!" });
    } else {
      next();
    }
  }
  next();
};
