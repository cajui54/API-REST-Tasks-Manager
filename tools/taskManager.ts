import { UserModel } from "../models/User.model";
import { Request, response } from "express";

interface ITask {
  _id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export const findUserById = async (id: string) => {
  const tasks = await UserModel.findById(id);

  if (tasks) {
    return tasks;
  }
  throw tasks;
};

export const createNewTask = async (request: Request, task: ITask) => {
  const addTask = await UserModel.findByIdAndUpdate(
    { _id: request.params.id },
    { $push: { tasks: task } }
  );
  return addTask;
};
export const removeTaskById = async (idUser: string, idTask: string) => {
  try {
    const deleteTask = await UserModel.findOneAndUpdate(
      {
        _id: idUser,
      },
      { $pull: { tasks: { _id: idTask } } },
      { new: true }
    );
    return deleteTask;
  } catch (error) {
    throw `Ocorreu um erro inesperado! ${error}`;
  }
};
export const updateTaskByTask = async (task: ITask) => {
  try {
    const updateTask = await UserModel.findOneAndUpdate(
      { "tasks._id": task._id },
      {
        $set: {
          "tasks.$.title": task.title,
          "tasks.$.description": task.description,
          "tasks.$.isComplete": task.isComplete,
        },
      }
    );
    return updateTask;
  } catch (error) {
    throw `Ocorreu um erro inesperado! ${error}`;
  }
};
