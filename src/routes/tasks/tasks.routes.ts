import express from "express";
import { addNewTask } from "../../controllers/taskController";

const routerTask = express();

routerTask.post("/", addNewTask);

export default routerTask;
