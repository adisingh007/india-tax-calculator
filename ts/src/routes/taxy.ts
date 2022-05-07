import { Router } from "express";
import { OLD_TAX_REGIME, NEW_TAX_REGIME } from "../constants";
import { calculateTax } from "../taxCalculator/taxCalculator";


export function getTaxyRoutes(): Router {
    const router = Router();

    router.get("/getTaxRates/:regime", (req, res) => {
        const regime = req?.params?.regime;
        if (regime) {
            if (regime === "old") {
                res.send(OLD_TAX_REGIME);
            } else if (regime === "new") {
                res.send(NEW_TAX_REGIME);
            } else {
                res.status(404).send(`No such regime: ${regime}`);
            }
        } else {
            res.status(404).send("No regime provided");
        }
    });
    
    router.get("/getTaxAmount/:regime/:amount", (req, res) => {
        const regime = req?.params?.regime;
        const amount = req?.params?.amount;
        const taxRates = regime === "old" ? OLD_TAX_REGIME : NEW_TAX_REGIME;
        res.send(calculateTax(taxRates, parseInt(amount)));
    });

    return router;
}

