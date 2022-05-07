import { DEFAULT_SLAB } from "../constants";
import { QuickTaxResponseType, RegimeType, SlabWiseTaxType, TaxSlabType } from "./types";

export const calculateTax = (taxRates: RegimeType, taxableAmount: number): SlabWiseTaxType => {
    const taxSlabs = taxRates?.slabs;
    const slabWiseTax: SlabWiseTaxType = {
        incomeBeforeTaxes: taxableAmount,
        totalPayableTax: 0.0,
        incomeAfterTaxes: taxableAmount,
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

const binarySearchTaxSlab = (
    taxSlabs: Array<TaxSlabType>,
    taxableAmount: number): TaxSlabType => {
    let left = 0;
    let right = taxSlabs.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const taxSlab = taxSlabs[mid];
        if (taxableAmount > taxSlab.gt && taxableAmount <= taxSlab.lte) {
            return taxSlab;
        } else if (taxableAmount > taxSlab.gt) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return DEFAULT_SLAB;
};

export const quickTax = (taxRates: RegimeType, taxableAmount: number): QuickTaxResponseType => {
    const taxSlabs = taxRates?.slabs;
    const quickTax: QuickTaxResponseType = {
        incomeBeforeTaxes: taxableAmount,
        totalPayableTax: 0.0,
        incomeAfterTaxes: taxableAmount,
        slab: DEFAULT_SLAB,
    };

    if (taxSlabs) {
        const taxSlab = binarySearchTaxSlab(taxSlabs, taxableAmount);
        quickTax.totalPayableTax = ((taxableAmount - taxSlab.gt) * taxSlab.rateMultiplier) + taxSlab.taxFromPrevSlab;
        quickTax.incomeAfterTaxes = taxableAmount - quickTax.totalPayableTax;
        quickTax.slab = taxSlab;
    }

    return quickTax;
};
