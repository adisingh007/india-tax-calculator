import { PORT } from "./constants";
import { app } from "./app";

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});
