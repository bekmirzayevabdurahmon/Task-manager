import { join } from "node:path";
import express from "express";
import { config } from "dotenv";
import axios from "axios";

config();

const app = express();

app.use("/styles", express.static(join(process.cwd(), "src" ,"styles")));
app.use("/js", express.static(join(process.cwd(), "src" ,"js")));

app.get("/", (req, res) => {
  res.sendFile(join(process.cwd(), "index.html"));
});

app.get("/page/:pageName", (req, res) => {
  const { pageName } = req.params;
  res.sendFile(join(process.cwd(), "src", "pages", `${pageName}.html`));
});

const PORT = process.env.APP_PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
