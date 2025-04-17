import app from "./app.js"
import { config } from "dotenv"
import { PORT } from "./config/app.config.js"
import connectDB from "./config/mongo.config.js";

config();
connectDB();

app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT} port✅`);
})