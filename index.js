import express from "express";
const app = express();
import { taskRouter } from "./src/routers/routers.js";

app.use(express.json());
app.use(express.text());
app.use("/tasks", taskRouter);

app.listen(1357, ()=>{
    console.log("Server running on port 1357");
})