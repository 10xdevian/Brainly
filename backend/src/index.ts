import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import cors from "cors";
import router from "./routes/apiRoutes";
import dbConnect from "./db";

const PORT = process.env.PORT || 4000;

const app = Express();
app.use(cors());
app.use(Express.json());
app.use(cors());

app.use("/api/v1/", router);

app.listen(PORT, () => {
  console.log(`server is starting : http//:localhost${PORT} `);
  dbConnect();
});
