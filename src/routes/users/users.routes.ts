import express from "express";
import { getAllUser, registerUser } from "../../controllers/userControler";
import { validate } from "../../../middleware/handleValidation";
import {
  checkIfExistEmail,
  userCreateValidation,
} from "../../../middleware/userValidation";

const routesUser = express();

routesUser.get("/", getAllUser);
routesUser.post(
  "/register",
  userCreateValidation(),
  checkIfExistEmail,
  validate,
  registerUser
);

export default routesUser;
