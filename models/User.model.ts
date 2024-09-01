import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  idTask: String,
  title: String,
  description: String,
  isComplete: Boolean,
});
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  tasks: [taskSchema],
});

export const UserModel = model("Users", userSchema);
