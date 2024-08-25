import config from "config";
import mongoose from "mongoose";

const connectDatabase = async () => {
  const dbURL = config.get<string>("urlConnection");

  try {
    await mongoose.connect(dbURL);
    console.log("MongoDB has been connect with sucess!");
  } catch (error) {
    console.log(`Occurred an error to connect to database!`);
  }
};

export default connectDatabase;
