import { getTaxyRoutes } from "./routes/taxy";
import { getHomeRoutes } from "./routes/home";
import { server } from "./server";

export const appServer = server;
appServer.use("/", getTaxyRoutes());
appServer.use("/", getHomeRoutes());
