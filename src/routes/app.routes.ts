import express from "express";
import routesUser from "./users/users.routes";
import routerTask from "./tasks/tasks.routes";

const routes = express();

routes.use("/tasks", routerTask);
routes.use("/users", routesUser);

export default routes;
