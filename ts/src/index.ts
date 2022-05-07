import { PORT } from "./constants";
import { app } from "./app";

const server = app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});

process.on('SIGINT', () => {
    console.log("SIGINT received!");
    if (server) {
        console.log("Stopping server...");
        server.close();
        console.log("Server stopped!");
    }
    console.log("Bye!");
    process.exit(1);
});
