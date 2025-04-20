import axios from "../../node_modules/axios/dist/esm/axios.js";
// import { config } from "dotenv";

// config();
const customAxios = axios.create({
    baseURL: "http://localhost:4000/api",
    timout: 10000,
});

export default customAxios;