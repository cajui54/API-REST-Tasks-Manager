import express from "express";
import routesUser from "./users/users.routes";
const routes = express();

routes.use("/users", routesUser);

export default routes;
