import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const port = process.env.PORT;
const server = express();

server.use(express.json());

server.listen(port, async () => {
  console.log(`Server is running at port ${port}!`);
});
