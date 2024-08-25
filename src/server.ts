import "dotenv/config";
import express from "express";
import app from "./routes/app";
import connectDatabase from "../config/db";
const port = process.env.PORT;
const server = express();

server.use(express.json());
server.use(app);

server.listen(port, async () => {
  await connectDatabase();
  console.log(`Server is running at port ${port}!`);
});
