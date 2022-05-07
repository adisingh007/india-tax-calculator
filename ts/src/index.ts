import { PORT } from "./constants";
import { app } from "./app";

const server = app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});

process.on('exit', () => {
    console.log("Exit signal received!");
    if (server) {
        console.log("Stopping server...");
        server.close();
        console.log("Server stopped!");
    }
    console.log("Bye!");
    process.exit(0);
});
