import { body } from "express-validator";
import { UserModel } from "../models/User.model";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
export const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("E-mail é obrigatório!")
      .isEmail()
      .withMessage("Não é um E-mail valido!"),
    body("password")
      .isString()
      .withMessage("Senha é obrigatório!")
      .isLength({ min: 6 })
      .withMessage("Senha deve conter ao meno 6 caracteres"),
  ];
};
export const checkIfExistEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;
  const usersExists = await UserModel.findOne({ email: email });

  if (usersExists) {
    return response
      .status(422)
      .json({ msg: "Por favor, utilize outro e-mail, esse já existe!" });
  }
  next();
};
export const checkIfExistUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = request.params.id;

  const user = await UserModel.findById(id, "-password");

  if (!user) {
    return response.status(404).json({ msg: "Usuário não foi encontrado!" });
  }
  next();
};
export const findEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email } = request.body;

  const findUser = await UserModel.findOne({ email: email });
  if (!findUser) {
    return response.status(422).json({ msg: "Usuário não foi encontrado!" });
  }
  next();
};
export const checkPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;

  const findUser = await UserModel.findOne({ email: email });

  if (findUser) {
    if (findUser.password) {
      const checkPassword = await bcrypt.compare(password, findUser.password);

      if (!checkPassword) {
        return response.status(404).json({ msg: "senha inválida!" });
      }
    }

    next();
  } else {
    return response.status(404).json({ msg: "Usuário não foi encontrado!add" });
  }
};
export const checkToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ msg: "Acesso negado!" });
  }
  try {
    const secret = process.env.SECRET ? process.env.SECRET : "";

    jwt.verify(token, secret);

    next();
  } catch (error) {
    return response.status(400).json({ msg: "Token inválido!" });
  }
};
