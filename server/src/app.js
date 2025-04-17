import express from "express";
import cors from "cors";
import router from "./modules/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*"
}))

app.use("/api", router);

app.all("/*splat", (req, res) => {
    res.status(404).send({
        message: `Bunday ${req.url} url topilmadi`,
    });
});

export default app;

