import request from 'supertest';
import app from '../../app';

describe('Wallet Controller', () => {
    describe('POST /wallet/deposit', () => {
        it('should return 200 and have status "success"', async () => {
            const resp = await request(app).post('/wallet/deposit').send({
                amount: 10,
            });
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toBe('success');
        });
        it('should return 400', async () => {
            const resp = await request(app).post('/wallet/deposit').send({
                amoun: 10,
            });
            expect(resp.status).toBe(400);
            expect(resp.body).toHaveProperty('error');
            expect(resp.body.error).toContain('amount');
        });
    });
    describe('POST /wallet/withdraw', () => {
        it('should return 200 and have status "success"', async () => {
            const resp = await request(app).post('/wallet/withdraw').send({
                amount: 10,
            });
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('status');
            expect(resp.body.status).toBe('success');
        });
        it('should return 400', async () => {
            const resp = await request(app).post('/wallet/withdraw').send({
                amoun: 10,
            });
            expect(resp.status).toBe(400);
            expect(resp.body).toHaveProperty('error');
            expect(resp.body.error).toContain('amount');
        });
        it('should return 500', async () => {
            const resp = await request(app).post('/wallet/withdraw').send({
                amount: 500,
            });
            expect(resp.status).toBe(500);
            expect(resp.body).toHaveProperty('error');
            expect(resp.body.error).toContain('Insufficient funds');
        });
    });
    describe('GET /wallet/balance', () => {
        it('should return 200 and have balance', async () => {
            const resp = await request(app).get('/wallet/balance');

            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('balance');
            expect(resp.body.balance).toBeGreaterThanOrEqual(100)
        });
    });
});