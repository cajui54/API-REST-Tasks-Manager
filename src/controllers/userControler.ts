import { Request, Response } from "express";
import { UserModel } from "../../models/User.model";

export const getAllUser = async (request: Request, response: Response) => {
  try {
    const users = await UserModel.find();
    if (users) {
      return response.status(200).json(users);
    }
    throw "Não há usuário cadastrados";
  } catch (error) {
    console.log(`Ocurred an error ${error}`);
    return response.status(422).json({ msg: error });
  }
};

export const registerUser = async (request: Request, response: Response) => {
  try {
    const user = request.body;
    const newUser = await UserModel.create(user);
    if (newUser) {
      return response.status(201).json(newUser);
    }
    throw "Ocorreu um erro ao cadastrar um novo usuário!";
  } catch (error) {
    return response
      .status(422)
      .json({ msg: `Ocorreu um erro inesperado, ${error}` });
  }
};
