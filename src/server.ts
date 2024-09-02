import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/app.routes";
import connectDatabase from "../config/db";
const port = process.env.PORT;
const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(port || 3333, async () => {
  await connectDatabase();
  console.log(`Server is running at port ${port}!`);
});
