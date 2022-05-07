import express from "express";
import { getTaxyRoutes } from "./routes/taxy";
import { getAppRoutes } from "./routes/app";

export const server = express();
server.use("/", getTaxyRoutes());
server.use("/", getAppRoutes());
