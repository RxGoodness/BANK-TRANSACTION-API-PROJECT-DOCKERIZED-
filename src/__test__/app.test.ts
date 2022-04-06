import supertest from 'supertest'
import app from '../app'
//import express, { Request, Response, NextFunction } from 'express'
//test for GET
describe('GET /', () => {
  test('GET /', (done) => {
    supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0]).toHaveProperty('accountNo')
        expect(res.status).toBe(200)
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })


  test('GET /account', (done) => {
    supertest(app)
      .get('/account')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0]).toHaveProperty('accountNo')
        expect(res.status).toBe(200)
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  //test for create
  test('POST /create', (done) => {
    supertest(app)
      .put(`balance`)
      .expect('Content-Type', /json/)
      .send({
       "balance": 40000
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('accountNo')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('createdAt')
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})
