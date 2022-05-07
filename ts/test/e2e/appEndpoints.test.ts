import { server } from '../../src/server'; 
import { getTaxyRoutes } from '../../src/routes/taxy';
import supertest from 'supertest';
import { OLD_TAX_REGIME, NEW_TAX_REGIME } from '../../src/constants';

describe("Upon requesting for /getTaxRates", () => {
    
    const taxySupertest = supertest(server);
    server.use("/", getTaxyRoutes());

    test("should return 404 with unexpected regime name", async () => {
        const response = await taxySupertest.get('/getTaxRates/unknown');
        expect(response.status).toBe(404);
        expect(response.text).toEqual("No such regime: unknown");
    });

    test("should return 404 as I do not provide regime at all", async () => {
        const response = await taxySupertest.get('/getTaxRates');
        expect(response.status).toBe(404);
    });

    test("should return 200 and returns new regime", async () => {
        const response = await taxySupertest.get('/getTaxRates/new');
        expect(response.status).toBe(200);
        expect(response.text).toEqual(JSON.stringify(NEW_TAX_REGIME));
    });

    test("should return 200 and returns old regime", async () => {
        const response = await taxySupertest.get('/getTaxRates/old');
        expect(response.status).toBe(200);
        expect(response.text).toEqual(JSON.stringify(OLD_TAX_REGIME));
    });
});

describe("Upon requesting for /getTaxAmount", () => {

    const taxySupertest = supertest(server);
    server.use("/", getTaxyRoutes());

    test("should return 404 with unexpected regime name", async () => {
        const regimeName = "unknown";
        const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/600000`);
        expect(response.status).toBe(404);
        expect(response.text).toBe(`No such regime ${regimeName}!`);
    });

    test("should return 404 with no regime name", async () => {
        const response = await taxySupertest.get(`/getTaxAmount/600000`);
        expect(response.status).toBe(404);
    });

    test("should return 404 with no amount", async () => {
        const regimeName = "new";
        const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/`);
        expect(response.status).toBe(404);
    });

    describe("as per new regime", () => {

        const taxySupertest = supertest(server);
        server.use("/", getTaxyRoutes());
        const regimeName = "new";

        test("tax deduction 0 on 150000 at 0% in 0-250000 slab", async () => {
            const amount = 150000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 150000,
                totalPayableTax: 0,
                incomeAfterTaxes: 150000,
                slab: {
                    gt: 0,
                    lte: 250000,
                    rateMultiplier: 0,
                    taxFromPrevSlab: 0,
                },
            }));
        });

        test("tax deduction 7500 on 400000 at 5% in 250000-500000 slab", async () => {
            const amount = 400000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 400000,
                totalPayableTax: 7500,
                incomeAfterTaxes: 392500,
                slab: {
                    gt: 250000,
                    lte: 500000,
                    rateMultiplier: 0.05,
                    taxFromPrevSlab: 0,
                },
            }));
        });

        test("tax deduction 22500 on 600000 at 10% in 500000-750000 slab", async () => {
            const amount = 600000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 600000,
                totalPayableTax: 22500,
                incomeAfterTaxes: 577500,
                slab: {
                    gt: 500000,
                    lte: 750000,
                    rateMultiplier: 0.1,
                    taxFromPrevSlab: 12500,
                },
            }));
        });

        test("tax deduction 52500 on 850000 at 15% in 750000-1000000 slab", async () => {
            const amount = 850000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 850000,
                totalPayableTax: 52500,
                incomeAfterTaxes: 797500,
                slab: {
                    gt: 750000,
                    lte: 1000000,
                    rateMultiplier: 0.15,
                    taxFromPrevSlab: 37500,
                },
            }));
        });

        test("tax deduction 95000 on 1100000 at 20% in 1000000-1250000 slab", async () => {
            const amount = 1100000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 1100000,
                totalPayableTax: 95000,
                incomeAfterTaxes: 1005000,
                slab: {
                    gt: 1000000,
                    lte: 1250000,
                    rateMultiplier: 0.2,
                    taxFromPrevSlab: 75000,
                },
            }));
        });

        test("tax deduction 150000 on 1350000 at 25% in 1250000-1500000 slab", async () => {
            const amount = 1350000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 1350000,
                totalPayableTax: 150000,
                incomeAfterTaxes: 1200000,
                slab: {
                    gt: 1250000,
                    lte: 1500000,
                    rateMultiplier: 0.25,
                    taxFromPrevSlab: 125000,
                },
            }));
        });

        test("tax deduction 217500 on 1600000 at 30% in above 1500000 slab", async () => {
            const taxySupertest = supertest(server);
            server.use("/", getTaxyRoutes());
            const regimeName = "new";
            const amount = 1600000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 1600000,
                totalPayableTax: 217500,
                incomeAfterTaxes: 1382500,
                slab: {
                    gt: 1500000,
                    lte: Number.POSITIVE_INFINITY,
                    rateMultiplier: 0.3,
                    taxFromPrevSlab: 187500,
                },
            }));
        });
    });

    describe("as per old regime", () => {

        const taxySupertest = supertest(server);
        server.use("/", getTaxyRoutes());
        const regimeName = "old";

        test("tax deduction 0 on 150000 at 0% in 0-250000 slab", async () => {
            const amount = 150000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 150000,
                totalPayableTax: 0,
                incomeAfterTaxes: 150000,
                slab: {
                    gt: 0,
                    lte: 250000,
                    rateMultiplier: 0,
                    taxFromPrevSlab: 0,
                },
            }));
        });

        test("tax deduction 7500 on 400000 at 5% in 250000-500000 slab", async () => {
            const amount = 400000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 400000,
                totalPayableTax: 7500,
                incomeAfterTaxes: 392500,
                slab: {
                    gt: 250000,
                    lte: 500000,
                    rateMultiplier: 0.05,
                    taxFromPrevSlab: 0,
                },
            }));
        });

        test("tax deduction 32500 on 600000 at 20% in 500000-750000 slab", async () => {
            const amount = 600000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 600000,
                totalPayableTax: 32500,
                incomeAfterTaxes: 567500,
                slab: {
                    gt: 500000,
                    lte: 750000,
                    rateMultiplier: 0.2,
                    taxFromPrevSlab: 12500,
                },
            }));
        });

        test("tax deduction 82500 on 850000 at 20% in 750000-1000000 slab", async () => {
            const amount = 850000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 850000,
                totalPayableTax: 82500,
                incomeAfterTaxes: 767500,
                slab: {
                    gt: 750000,
                    lte: 1000000,
                    rateMultiplier: 0.2,
                    taxFromPrevSlab: 62500,
                },
            }));
        });

        test("tax deduction 142500 on 1100000 at 30% in 1000000-1250000 slab", async () => {
            const amount = 1100000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 1100000,
                totalPayableTax: 142500,
                incomeAfterTaxes: 957500,
                slab: {
                    gt: 1000000,
                    lte: 1250000,
                    rateMultiplier: 0.3,
                    taxFromPrevSlab: 112500,
                },
            }));
        });

        test("tax deduction 52500 on 1350000 at 30% in 1250000-1500000 slab", async () => {
            const amount = 1350000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 1350000,
                totalPayableTax: 217500,
                incomeAfterTaxes: 1132500,
                slab: {
                    gt: 1250000,
                    lte: 1500000,
                    rateMultiplier: 0.3,
                    taxFromPrevSlab: 187500,
                },
            }));
        });

        test("tax deduction 217500 on 1600000 at 30% in above 1500000 slab", async () => {
            const amount = 1600000;
            const response = await taxySupertest.get(`/getTaxAmount/${regimeName}/${amount}`);
            expect(response.status).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                incomeBeforeTaxes: 1600000,
                totalPayableTax: 292500,
                incomeAfterTaxes: 1307500,
                slab: {
                    gt: 1500000,
                    lte: Number.POSITIVE_INFINITY,
                    rateMultiplier: 0.3,
                    taxFromPrevSlab: 262500,
                },
            }));
        });
    });
});
