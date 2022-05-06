import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (_, res) => {
    res.send("Taxy is running...");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});
