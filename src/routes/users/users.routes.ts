import express from "express";
import {
  authLogin,
  getAllUser,
  getUserById,
  registerUser,
} from "../../controllers/userControler";
import { validate } from "../../../middleware/handleValidation";
import {
  checkIfExistEmail,
  checkIfExistUser,
  checkPassword,
  checkToken,
  findEmail,
  loginValidation,
  userCreateValidation,
} from "../../../middleware/userValidation";

const routesUser = express();

routesUser.get("/", getAllUser);
routesUser.get("/:id", checkIfExistUser, checkToken, getUserById);
routesUser.post(
  "/register",
  userCreateValidation(),
  checkIfExistEmail,
  validate,
  registerUser
);
routesUser.post(
  "/auth/login",
  loginValidation(),
  findEmail,
  checkPassword,
  validate,
  authLogin
);
export default routesUser;
