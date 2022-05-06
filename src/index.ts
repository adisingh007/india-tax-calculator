import express from "express";
import { PORT } from "./constants";
import { getMessage } from "./message";

const app = express();

app.get("/", (_, res) => {
    res.send("Taxy is running...");
});

app.get("/getMessage/:userName", (req, res) => {
    const userName = req?.params?.userName;
    if (typeof userName === "string") {
        res.send(getMessage(userName));
    } else {
        res.status(401).send("Please provide a name");
    }
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});
