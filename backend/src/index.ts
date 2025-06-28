import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import cors from "cors";
import dbConnect from "./db";
import router from "./routes/apiRoutes";

const PORT = process.env.PORT || 4000;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(cors());

app.use("/api/v1/", router);

app.listen(3000, () => {
  console.log("server is starting ");
  dbConnect();
});
