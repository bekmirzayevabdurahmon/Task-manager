import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import router from "./router/all.router.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api", router); 

app.all("/*splat", (req, res) => {
    res.status(404).send({
        message: `Bunday ${req.url} url topilmadi`,
    });
});

export default app;

