import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import errorHandler from "./middlewares/errorHandler.js";
import { connectToDB } from "./db/index.js";

const app = express();
const PORT = process.env.PORT || 8080;

connectToDB();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", authRouter);
app.use("*", (req, res) => res.sendStatus(404));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
