import { OLD_TAX_REGIME, NEW_TAX_REGIME } from "../../src/constants";
import { calculateTax } from "../../src/taxCalculator";

describe("Tax is 0 in", () => {
  test('Old if income is less than 250000', () => {
    expect(calculateTax(OLD_TAX_REGIME, 125000)).toEqual({
      incomeAfterTaxes: 125000,
      totalPayableTax: 0,
      incomeBeforeTaxes: 125000,
      slabs: [
        {
          taxInThisSlab: 0,
          taxSlab: {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            taxFromPrevSlab: 0
          },
          totalTaxesTillNow: 0
        }
      ],
    });
  });
  
  test("New regime if income is less than 250000", () => {
    expect(calculateTax(NEW_TAX_REGIME, 125000)).toEqual({
      incomeAfterTaxes: 125000,
      totalPayableTax: 0,
      incomeBeforeTaxes: 125000,
      slabs: [
        {
          taxInThisSlab: 0,
          taxSlab: {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            taxFromPrevSlab: 0
          },
          totalTaxesTillNow: 0
        }
      ],
    });
  });
});

describe("Tax is deducted", () => {
  test("7500 on 400000 income as per Old tax regime", () => {
    expect(calculateTax(OLD_TAX_REGIME, 400000)).toEqual({
      incomeAfterTaxes: 392500,
      totalPayableTax: 7500,
      incomeBeforeTaxes: 400000,
      slabs: [
        {
          taxInThisSlab: 0,
          taxSlab: {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            taxFromPrevSlab: 0
          },
          totalTaxesTillNow: 0
        },
        {
          taxInThisSlab: 7500,
          taxSlab: {
            gt: 250000,
            lte: 500000,
            rateMultiplier: 0.05,
            taxFromPrevSlab: 0
          },
          totalTaxesTillNow: 7500
        },
      ]
    });
  });

  test("7500 on 400000 income as per New tax regime", () => {
    expect(calculateTax(NEW_TAX_REGIME, 400000)).toEqual({
      incomeAfterTaxes: 392500,
      totalPayableTax: 7500,
      incomeBeforeTaxes: 400000,
      slabs: [
        {
          taxInThisSlab: 0,
          taxSlab: {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            taxFromPrevSlab: 0
          },
          totalTaxesTillNow: 0
        },
        {
          taxInThisSlab: 7500,
          taxSlab: {
            gt: 250000,
            lte: 500000,
            rateMultiplier: 0.05,
            taxFromPrevSlab: 0
          },
          totalTaxesTillNow: 7500
        },
      ]
    });
  });

  test("457500 on 2400000 income as per Old tax regime", () => {
    expect(calculateTax(OLD_TAX_REGIME, 2400000)).toEqual({
      "incomeBeforeTaxes": 2400000,
      "totalPayableTax": 532500,
      "incomeAfterTaxes": 1867500,
      "slabs": [
        {
          "taxSlab": {
            "gt": 0,
            "lte": 250000,
            "rateMultiplier": 0,
            "taxFromPrevSlab": 0
          },
          "taxInThisSlab": 0,
          "totalTaxesTillNow": 0
        },
        {
          "taxSlab": {
            "gt": 250000,
            "lte": 500000,
            "rateMultiplier": 0.05,
            "taxFromPrevSlab": 0
          },
          "taxInThisSlab": 12500,
          "totalTaxesTillNow": 12500
        },
        {
          "taxSlab": {
            "gt": 500000,
            "lte": 750000,
            "rateMultiplier": 0.2,
            "taxFromPrevSlab": 12500
          },
          "taxInThisSlab": 50000,
          "totalTaxesTillNow": 62500
        },
        {
          "taxSlab": {
            "gt": 750000,
            "lte": 1000000,
            "rateMultiplier": 0.2,
            "taxFromPrevSlab": 62500
          },
          "taxInThisSlab": 50000,
          "totalTaxesTillNow": 112500
        },
        {
          "taxSlab": {
            "gt": 1000000,
            "lte": 1250000,
            "rateMultiplier": 0.3,
            "taxFromPrevSlab": 112500
          },
          "taxInThisSlab": 75000,
          "totalTaxesTillNow": 187500
        },
        {
          "taxSlab": {
            "gt": 1250000,
            "lte": 1500000,
            "rateMultiplier": 0.3,
            "taxFromPrevSlab": 187500
          },
          "taxInThisSlab": 75000,
          "totalTaxesTillNow": 262500
        },
        {
          "taxSlab": {
            "gt": 1500000,
            "lte": Number.POSITIVE_INFINITY,
            "rateMultiplier": 0.3,
            "taxFromPrevSlab": 262500
          },
          "taxInThisSlab": 270000,
          "totalTaxesTillNow": 532500
        }
      ]
    });
  });

  test("457500 on 2400000 income as per New tax regime", () => {
    expect(calculateTax(NEW_TAX_REGIME, 2400000)).toEqual({
      "incomeBeforeTaxes": 2400000,
      "totalPayableTax": 457500,
      "incomeAfterTaxes": 1942500,
      "slabs": [
        {
          "taxSlab": {
            "gt": 0,
            "lte": 250000,
            "rateMultiplier": 0,
            "taxFromPrevSlab": 0
          },
          "taxInThisSlab": 0,
          "totalTaxesTillNow": 0
        },
        {
          "taxSlab": {
            "gt": 250000,
            "lte": 500000,
            "rateMultiplier": 0.05,
            "taxFromPrevSlab": 0
          },
          "taxInThisSlab": 12500,
          "totalTaxesTillNow": 12500
        },
        {
          "taxSlab": {
            "gt": 500000,
            "lte": 750000,
            "rateMultiplier": 0.1,
            "taxFromPrevSlab": 12500
          },
          "taxInThisSlab": 25000,
          "totalTaxesTillNow": 37500
        },
        {
          "taxSlab": {
            "gt": 750000,
            "lte": 1000000,
            "rateMultiplier": 0.15,
            "taxFromPrevSlab": 37500
          },
          "taxInThisSlab": 37500,
          "totalTaxesTillNow": 75000
        },
        {
          "taxSlab": {
            "gt": 1000000,
            "lte": 1250000,
            "rateMultiplier": 0.2,
            "taxFromPrevSlab": 75000
          },
          "taxInThisSlab": 50000,
          "totalTaxesTillNow": 125000
        },
        {
          "taxSlab": {
            "gt": 1250000,
            "lte": 1500000,
            "rateMultiplier": 0.25,
            "taxFromPrevSlab": 125000
          },
          "taxInThisSlab": 62500,
          "totalTaxesTillNow": 187500
        },
        {
          "taxSlab": {
            "gt": 1500000,
            "lte": Number.POSITIVE_INFINITY,
            "rateMultiplier": 0.3,
            "taxFromPrevSlab": 187500
          },
          "taxInThisSlab": 270000,
          "totalTaxesTillNow": 457500
        }
      ]
    });
  });
});
