import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import cors from "cors";
import dbConnect from "./db";
import router from "./routes/authRoutes";

const PORT = process.env.PORT || 4000;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(cors());

app.use("/api/auth", router);

app.listen(3000, () => {
  console.log("server is starting ");
  dbConnect();
});
