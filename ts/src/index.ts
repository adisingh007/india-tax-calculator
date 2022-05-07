import { PORT } from "./constants";
import { server } from "./server";

const runningServer = server.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});

process.on('exit', () => {
    console.log("Exit signal received!");
    if (runningServer) {
        console.log("Stopping server...");
        runningServer.close();
        console.log("Server stopped!");
    }
    console.log("Bye!");
    process.exit(0);
});
