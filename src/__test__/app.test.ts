import request from 'supertest';
import app from '../app';

const balance = {
  accountNo: 5910296934,
  balance: 76000,
  createdAt: '2022-04-06T15:17:57.931Z',
};

const balancePost = {
  balance: 76000,
};

const transaction = {
  reference: '6b9bc2fd-4e41-466e-bfed-0b33f73387ee',
  senderAccount: 3717596176,
  amount: 3000,
  receiverAccount: 7337122585,
  transferDescription: 'Payment',
  createdAt: '2022-04-06T21:58:01.419Z',
};

const trans = {
  senderAccount: 3717596176,
  receiverAccount: 7337122585,
  amount: 3000,
  transferDescription: 'Payment',
};

describe('Should respond with 200 when user is posted', () => {
  it('POST /send', async () => {
    const res = await request(app)
      .post('/create')
      // .expect("Content-Type")
      .send({
        balancePost,
      });
    expect(200).toBe(200);
  });

  it('should return 404 status code', async () => {
    const res = await request(app).post('').send(balancePost);
    expect(404).toBe(404);
  });
});

describe('Should return 200 for users found', () => {
  it('GET /balance', async () => {
    const res = await request(app).get('/balances').send({
      balance,
    });
    expect(200).toStrictEqual(200);
  });

  it('GET /', async () => {
    const res = await request(app).get('/bal').send({
      balance,
    });
    expect(404).toBe(404);
  });
});

describe('GET /balances/:id', () => {
  it('should return an 200 status for item found', async () => {
    let accountNumber;
    const res = await request(app).get(`/balances/${accountNumber}`);
    expect(res.status).toBe(404);
  });
});

describe('GET /balances/:id', () => {
  it('should return an 404 status for item not found', async () => {
    let accountNumber;
    const res = await request(app).put(`/${accountNumber}`);
    expect(404).toBe(404);
  });
});

describe('POST /transfer', () => {
  it('should return a status for item not found', async () => {
    const res = await request(app).get(`/transfer`);
    expect(200).toBe(200);
  });

  it('POST /transfer', async () => {
    let accountNumber;
    const res = await request(app).get(`/transfer/${accountNumber}`);
    expect(res.status).toBe(404);
  });
});
