import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL;
    if (!dbURL) {
      throw new Error("DB URL is not defined in env");
    }
    await mongoose.connect(dbURL);
    console.log("✅ Database is connected");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Database connection error:", error.message);
    } else {
      console.log("Caught non-Error", error);
    }
  }
};

export default dbConnect;
