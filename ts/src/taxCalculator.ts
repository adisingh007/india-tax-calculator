import { RegimeType, SlabWiseTaxType } from "./types";

export const calculateTax = (taxRates: RegimeType, taxableAmount: number): SlabWiseTaxType => {
    const taxSlabs = taxRates?.slabs;
    const slabWiseTax: SlabWiseTaxType = {
        incomeBeforeTaxes: taxableAmount,
        totalPayableTax: 0.0,
        incomeAfterTaxes: 0.0,
        slabs: [],
    };
    if (taxSlabs) {
        let timeToBreak = false;
        for (const taxSlab of taxSlabs) {
            let taxInThisSlab = (taxSlab.lte - taxSlab.gt) * taxSlab.rateMultiplier;
            if (taxableAmount > taxSlab.gt && taxableAmount <= taxSlab.lte) {
                taxInThisSlab = (taxableAmount - taxSlab.gt) * taxSlab.rateMultiplier;
                slabWiseTax.totalPayableTax = taxSlab.taxFromPrevSlab + taxInThisSlab;
                slabWiseTax.incomeAfterTaxes = taxableAmount - slabWiseTax.totalPayableTax;
                timeToBreak = true;
            }
            const totalTaxesTillNow = taxInThisSlab + taxSlab.taxFromPrevSlab;
            slabWiseTax.slabs.push({
                taxSlab,
                taxInThisSlab,
                totalTaxesTillNow,
            });
            if (timeToBreak) break;
        }
    }
    return slabWiseTax;
};
