import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDb connected to : ", connect.connection.host);
  } catch (error) {
    console.log("Erorr in Connecting with Database", error);
    process.exit(1);
  }
};

export default connectDB;
