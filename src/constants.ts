import { RegimeType } from "./types";

export const PORT = 8080;
export const OLD_TAX_REGIME: RegimeType = {
    slabs: [
        {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            taxFromPrevSlab: 0,
        },
        {
            gt: 250000,
            lte: 500000,
            rateMultiplier: 0.05,
            taxFromPrevSlab: 0,
        },
        {
            gt: 500000,
            lte: 750000,
            rateMultiplier: 0.2,
            taxFromPrevSlab: 12500,
        },
        {
            gt: 750000,
            lte: 1000000,
            rateMultiplier: 0.2,
            taxFromPrevSlab: 62500,
        },
        {
            gt: 1000000,
            lte: 1250000,
            rateMultiplier: 0.3,
            taxFromPrevSlab: 112500,
        },
        {
            gt: 1250000,
            lte: 1500000,
            rateMultiplier: 0.3,
            taxFromPrevSlab: 187500,
        },
        {
            gt: 1500000,
            lte: Number.POSITIVE_INFINITY,
            rateMultiplier: 0.3,
            taxFromPrevSlab: 262500,
        },
    ],
};
export const NEW_TAX_REGIME: RegimeType = {
    slabs: [
        {
            gt: 0,
            lte: 250000,
            rateMultiplier: 0,
            taxFromPrevSlab: 0,
        },
        {
            gt: 250000,
            lte: 500000,
            rateMultiplier: 0.05,
            taxFromPrevSlab: 0,
        },
        {
            gt: 500000,
            lte: 750000,
            rateMultiplier: 0.1,
            taxFromPrevSlab: 12500,
        },
        {
            gt: 750000,
            lte: 1000000,
            rateMultiplier: 0.15,
            taxFromPrevSlab: 37500,
        },
        {
            gt: 1000000,
            lte: 1250000,
            rateMultiplier: 0.2,
            taxFromPrevSlab: 75000,
        },
        {
            gt: 1250000,
            lte: 1500000,
            rateMultiplier: 0.25,
            taxFromPrevSlab: 125000,
        },
        {
            gt: 1500000,
            lte: Number.POSITIVE_INFINITY,
            rateMultiplier: 0.3,
            taxFromPrevSlab: 187500,
        },
    ],
};
