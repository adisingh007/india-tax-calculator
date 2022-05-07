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