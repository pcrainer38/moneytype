import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb://${process.env.DB_USERNAME}:${encodeURIComponent(
      process.env.DB_PASSWORD
    )}@${process.env.DB_HOST}:27017/${
      process.env.DB_NAME
    }?authMechanism=DEFAULT&authSource=${process.env.DB_NAME}`
);

export default mongoose.connection;
