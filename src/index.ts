import express from "express";
import { PORT } from "./constants";

const app = express();

app.get("/", (_, res) => {
    res.send("Taxy is running...");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});
