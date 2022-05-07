import { PORT } from "./constants";
import { appServer } from "./serverSetup";

const runningAppServer = appServer.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});

process.on('exit', () => {
    console.log("Exit signal received!");
    if (runningAppServer) {
        console.log("Stopping server...");
        runningAppServer.close();
        console.log("Server stopped!");
    }
    console.log("Bye!");
    process.exit(0);
});
