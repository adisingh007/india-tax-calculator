export type TaxSlabType = {
    gt: number,
    lte: number,
    rateMultiplier: number,
    taxFromPrevSlab: number,
};

export type RegimeType = {
    slabs: Array<TaxSlabType>,
}

export type ResultTaxSlabType = {
    taxSlab: TaxSlabType,
    taxInThisSlab: number,
    totalTaxesTillNow: number,
}

export type SlabWiseTaxType = {
    incomeBeforeTaxes: number,
    totalPayableTax: number,
    incomeAfterTaxes: number,
    slabs: Array<ResultTaxSlabType>,
};

export type QuickTaxResponseType = {
    incomeBeforeTaxes: number,
    totalPayableTax: number,
    incomeAfterTaxes: number,
    slab: TaxSlabType,
};
