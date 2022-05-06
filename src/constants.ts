export const PORT = 8080;
export const OLD_TAX_REGIME = {
    slabs: [
        {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            flatFees: 0,
        },
        {
            gt: 250000,
            lte: 500000,
            rateMultiplier: 0.05,
            flatFees: 0,
        },
        {
            gt: 500000,
            lte: 750000,
            rateMultiplier: 0.2,
            flatFees: 12500,
        },
        {
            gt: 750000,
            lte: 1000000,
            rateMultiplier: 0.2,
            flatFees: 62500,
        },
        {
            gt: 1000000,
            lte: 1250000,
            rateMultiplier: 0.3,
            flatFees: 112500,
        },
        {
            gt: 1250000,
            lte: 1500000,
            rateMultiplier: 0.3,
            flatFees: 187500,
        },
        {
            gt: 1500000,
            rateMultiplier: 0.3,
            flatFees: 262500,
        },
    ],
};
export const NEW_TAX_REGIME = {
    slabs: [
        {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            flatFees: 0,
        },
        {
            gt: 250000,
            lte: 500000,
            rateMultiplier: 0.05,
            flatFees: 0,
        },
        {
            gt: 500000,
            lte: 750000,
            rateMultiplier: 0.1,
            flatFees: 12500,
        },
        {
            gt: 750000,
            lte: 1000000,
            rateMultiplier: 0.15,
            flatFees: 37500,
        },
        {
            gt: 1000000,
            lte: 1250000,
            rateMultiplier: 0.2,
            flatFees: 75000,
        },
        {
            gt: 1250000,
            lte: 1500000,
            rateMultiplier: 0.25,
            flatFees: 125000,
        },
        {
            gt: 1500000,
            rateMultiplier: 0.3,
            flatFees: 187500,
        },
    ],
};
