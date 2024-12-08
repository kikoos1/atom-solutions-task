import request from 'supertest';
import app from '../../app';

describe('Game Controller', () => {
    describe('POST /play', () => {
        it('should return 200 and have matrix and winnings', async () => {
            const resp = await request(app).post('/play').send({
                bet: 10,
            });
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('matrix');
            expect(resp.body).toHaveProperty('winnings');
        });
        it('should return 400', async () => {
            const resp = await request(app).post('/play').send({
                amount: 10,
            });
            expect(resp.status).toBe(400);
            expect(resp.body).toHaveProperty('error');
            expect(resp.body.error).toContain('bet');
        });
    });

    describe('POST /sim', () => {
        it('should return 200 and have totalWinnings and netResult', async () => {
            const resp = await request(app).post('/sim').send({
                bet: 10,
                count: 2,
            });
            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('totalWinnings');
            expect(resp.body).toHaveProperty('netResult');
        });
        it('should return 400 for bet', async () => {
            const resp = await request(app).post('/sim').send({
                count: 2,
            });
            expect(resp.status).toBe(400);
            expect(resp.body).toHaveProperty('error');
            expect(resp.body.error).toContain('bet');
        });

        it('should return 400 for count', async () => {
            const resp = await request(app).post('/sim').send({
                bet: 10,
            });
            expect(resp.status).toBe(400);
            expect(resp.body).toHaveProperty('error');
            expect(resp.body.error).toContain('count');
        });
    });

    describe('GET /rtp', () => {
        it('should return 200 and have rtp', async () => {
            const resp = await request(app).get('/rtp');

            expect(resp.status).toBe(200);
            expect(resp.body).toHaveProperty('rtp');
            expect(resp.body.rtp).toBeGreaterThanOrEqual(0);
        });
    });
});