import { Request, Response } from "express";

export const addNewTask = async (request: Request, response: Response) => {
  return response.status(201).json({ msg: "Xablau" });
};
