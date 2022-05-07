import { Router } from "express";

export function getAppRoutes(): Router {
    const router = Router();
    router.get("/", (_, res) => {
        res.send("Taxy - to save the day!");
    });
    return router;
}
