import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('API Health Check', () => {
  it('should return 200 OK for the health endpoint', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
