import request from "supertest";
import app from "../app";

const balance = {
  "accountNo": 3708871056,
    "balance": 44000,
    "createdAt": "2022-04-06T15:17:47.855Z"
};

const balancePost = {
  "balance": 44000,
};

const transaction = {
  "reference": "553b8e0e-0310-4edb-933a-0dcb1332a76a",
    "senderAccount": 3708871056,
    "amount": 3000,
    "receiverAccount": 5910296934,
    "transferDescription": "Payment",
    "createdAt": "2022-04-06T15:20:20.606Z"
}

const trans = {
  "senderAccount": 3708871056,
  "amount": 2000,
  "receiverAccount": 5910296934,
  "transferDescription": "for payment",
}


// let accountNumber;

describe("Should respond with 200 when user is posted", () => {

  it("POST /send", async () =>  {
    const res = await request(app)
      .post("/create-account")
      .expect("Content-Type", /json/)
      .send({
        balancePost
      });
      expect(200).toBe(200)
  });

  it("should return 404 status code", async () => {
    const res = await request(app)
    .post("").send(balancePost);
    expect(404).toBe(404);
  })

});

describe("Should return 200 for users found", () => {
  it("GET /balance", async () => {
    const res = await request(app).get("/balances")
      .send({
        balance
      })
      expect(200).toStrictEqual(200)
  });

  it("GET /", async () => {
    const res = await request(app).get("/bal")
      .send({
        balance
      })
      expect(404).toBe(404)
  });
});


describe("GET /balances/:id", () => {

    it("should return an 200 status for item found", async () => {
      let accountNumber;
        const res = await request(app).get(`/balances/${accountNumber}`);
        expect(res.status).toBe(404);
    });

});

describe("GET /balances/:id", () => {

  it("should return an 404 status for item not found", async () => {
    let accountNumber;
      const res = await request(app).put(`/${accountNumber}`);
      expect(404).toBe(404);
  });

});

describe("POST /transfer", () => {

    it("should return a status for item not found", async () => {
        const res = await request(app).delete(`/transfer`);
        expect(200).toBe(200);
    });

    it("POST /transfer", async () => {
      let accountNumber;
      const res = await request(app).delete(`/transfer/${accountNumber}`)
        expect(res.status).toBe(404);
    });

});
