import { Express } from "express-serve-static-core";
import { OLD_TAX_REGIME, NEW_TAX_REGIME } from "./constants";
import { calculateTax } from "./taxCalculator";


export function attachRoutes(server: Express): void {
    server.get("/", (_, res) => {
        res.send("Taxy is running...");
    });
    
    server.get("/getTaxRates/:regime", (req, res) => {
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
    
    server.get("/getTaxAmount/:regime/:amount", (req, res) => {
        const regime = req?.params?.regime;
        const amount = req?.params?.amount;
        const taxRates = regime === "old" ? OLD_TAX_REGIME : NEW_TAX_REGIME;
        res.send(calculateTax(taxRates, parseInt(amount)));
    });
}

