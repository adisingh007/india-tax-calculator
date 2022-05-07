import { appServer } from '../../src/serverSetup'; 
import supertest from 'supertest';

describe("Home page", () => {
    test("should return 200", async () => {
        const response = await supertest(appServer).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toEqual("Taxy - to save the day!");
    });
});
