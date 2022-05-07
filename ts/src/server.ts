import express from "express";
import { attachRoutes } from "./app";

export const server = express();
attachRoutes(server);
