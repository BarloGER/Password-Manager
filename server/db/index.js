import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const client = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB @ ${client.connection.host}`);
    return client;
  } catch (error) {
    throw error;
  }
};

export { connectToDB };
