import express from "express";
import { PORT, OLD_TAX_REGIME, NEW_TAX_REGIME } from "./constants";

const app = express();

app.get("/", (_, res) => {
    res.send("Taxy is running...");
});

app.get("/getTaxRates/:regime", (req, res) => {
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

app.get("/getTaxAmount/:regime/:amount", (req, res) => {
    const regime = req?.params?.regime;
    const amount = req?.params?.amount;
    if(!regime) {
        res.status(404).send("No regime provided");
    } else if(!amount) {
        res.status(404).send("No amount provided");
    } else {
        const taxRates = regime === "old" ? OLD_TAX_REGIME : NEW_TAX_REGIME;
        const taxSlabs = taxRates?.slabs;
        if (taxSlabs) {
            let taxableAmount = parseInt(amount);
            let taxPayable = 0.0;
            let taxedAmount = 0.0;
            let prevLte = 0.0;
            const result: {slabs: Array<unknown>, totalPayableTax: number} = {
                totalPayableTax: 0.0,
                slabs: [],
            };
            for (const taxSlab of taxSlabs) {
                if ("gt" in taxSlab && taxableAmount > taxSlab.gt) {
                    taxSlab.flatFees = 0;
                    if (taxSlab.lte && taxableAmount > taxSlab.lte) {
                        const amt = taxSlab.lte - taxSlab.gt;
                        const tax = (taxSlab.rateMultiplier * amt) + taxSlab.flatFees;
                        taxPayable += tax;
                        taxedAmount += amt;
                        prevLte = taxSlab.lte;
                        const res = {
                            slab: taxSlab,
                            amount: amt,
                            tax,
                            taxPayable,
                            taxedAmount,
                        };
                        result.slabs.push(res);
                        result.totalPayableTax = taxPayable;
                    } else {
                        const amt = taxableAmount-prevLte;
                        const tax = (taxSlab.rateMultiplier * amt) + taxSlab.flatFees;
                        taxPayable += tax;
                        const res = {
                            slab: taxSlab,
                            amount: amt,
                            tax,
                            taxPayable,
                            taxedAmount,
                        }
                        result.slabs.push(res);
                        result.totalPayableTax = taxPayable;
                    }
                }
            }

            res.send(result);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}...`);
});
