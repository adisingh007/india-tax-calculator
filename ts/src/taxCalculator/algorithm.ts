import { DEFAULT_SLAB } from "../constants";
import { TaxSlabType } from "./types";

export const binarySearchTaxSlab = (
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
