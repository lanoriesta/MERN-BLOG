import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected to ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default mongoDB;
