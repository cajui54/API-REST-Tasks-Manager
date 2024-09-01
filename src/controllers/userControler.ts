import { Request, Response } from "express";
import { UserModel } from "../../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createNewTask,
  findUserById,
  removeTaskById,
  updateTaskByTask,
} from "../../tools/taskManager";

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
export const getUserById = async (request: Request, response: Response) => {
  const id = request.params.id;

  const user = await UserModel.findById(id, "-password");

  if (!user) {
    return response.status(404).json({ msg: "Usuário não encontrado!" });
  }

  return response.status(200).json(user);
};
export const registerUser = async (request: Request, response: Response) => {
  try {
    const user = request.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(user.password, salt);
    const newUser = { ...user, password: passwordHash, tasks: [] };

    await UserModel.create(newUser);

    return response
      .status(201)
      .json({ msg: "Usuário foi cadastrado com sucesso!" });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: `Ocorreu um erro inesperado, ${error}` });
  }
};
export const authLogin = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email: email });

  try {
    if (user) {
      const secret = process.env.SECRET ? process.env.SECRET : "";

      const token = jwt.sign({ id: user._id }, secret);
      return response
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso!", token });
    }
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ msg: "Ocorreu um erro no servidor, tente mais tarde!" });
  }
};
export const addNewTask = async (request: Request, response: Response) => {
  try {
    const newTask = request.body;

    createNewTask(request, newTask);

    return response
      .status(200)
      .json({ msg: "Tarefa foi cadastrada com sucesso!" });
  } catch (error) {
    return response
      .status(400)
      .json({ msg: "Ocorreu um erro inesperado: \n" + error });
  }
};
export const deleteTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = request.body;

  try {
    const tasks = await removeTaskById(id, task.idTask);

    return response.status(201).json(tasks);
  } catch (error) {
    return response
      .status(400)
      .json({ msg: `Ocorreu um erro inesperado ${error}` });
  }
};
export const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = request.body;
  try {
    const value = await updateTaskByTask(id, task);

    return response.status(201).json(value);
  } catch (error) {
    return response
      .status(400)
      .json({ msg: `Ocorreu um erro inesperado ${error}` });
  }
};
