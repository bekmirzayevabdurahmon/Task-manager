import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from "./router/all.router.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*"
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/submit", (req, res) => {
    const { name, email, password } = req.body;
    console.log("Ma'lumotlar:", name, email, password);
    res.send("Ma'lumotlar yuborildi!");
});

app.use(cookieParser());

app.use("/api", router); 

app.all("/*splat", (req, res) => {
    res.status(404).send({
        message: `Bunday ${req.url} url topilmadi`,
    });
});

export default app;

