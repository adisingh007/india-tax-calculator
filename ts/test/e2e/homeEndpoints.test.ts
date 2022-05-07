import { server } from '../../src/server'; 
import { getHomeRoutes } from '../../src/routes/home';
import supertest from 'supertest';

describe("Home page", () => {
    test("should return 404 as I did not add route", async () => {
        const homeSupertest = supertest(server);
        const response = await homeSupertest.get('/');
        expect(response.status).toBe(404);
    });

    test("should return 200 as I added route", async () => {
        const homeSupertest = supertest(server);
        server.use("/", getHomeRoutes());
        const response = await homeSupertest.get('/');
        expect(response.status).toBe(200);
        expect(response.text).toEqual("Taxy - to save the day!");
    });
});
