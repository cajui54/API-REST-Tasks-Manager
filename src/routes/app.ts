import express from "express";
import routesUser from "./users/users.routes";
const app = express();

app.use("/users", routesUser);

export default app;
