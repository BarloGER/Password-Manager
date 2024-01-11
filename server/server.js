import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("*", (req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
