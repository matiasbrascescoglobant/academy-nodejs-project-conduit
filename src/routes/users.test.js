import req from 'supertest';
import { createUser, findUserByEmail, updateUser } from '../services/user-service';
import app from '../app';
import bcrypt from 'bcryptjs';

jest.mock('../services/user-service');
jest.mock('../middlewares/auth', () => jest.fn((req, res, next) => {
    req.user = {
        email: 'matias.brascesco@globant.com',
        username: 'mnbd',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGlhcy5icmFzY2VzY29AZ2xvYmFudC5jb20iLCJ1c2VybmFtZSI6Im1uYmQiLCJpYXQiOjE2NDEzMTI0MjJ9.yECdIerCuYH-R0Uxm5-GPbc9rN_Sm3rylf-3sFGtXgs'
      }
    req.user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGlhcy5icmFzY2VzY29AZ2xvYmFudC5jb20iLCJ1c2VybmFtZSI6Im1uYmQiLCJpYXQiOjE2NDEzMTI0MjJ9.yECdIerCuYH-R0Uxm5-GPbc9rN_Sm3rylf-3sFGtXgs";
    next()
}));

describe('Test user routes', () => {
  it('POST /api/users should register', (done) => {
    createUser.mockReturnValue({ 
        email: 'matias.brascesco@globant.com', 
        password: '123', 
        username: 'mnbd' 
    })
    req(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ 
          user: { 
                email: 'matias.brascesco@globant.com', 
                password: '123', 
                username: 'mnbd' 
            } 
        })
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  it('POST /api/users/login should not be authorized', (done) => {
    findUserByEmail.mockReturnValue(null)
    req(app)
      .post('/api/users/login')
      .send({ 
          user: { 
              email: 'wrong.email@globant.com', 
              password: '123' 
            } 
        })
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.errors.body[0]).toBe('Wrong credentials')
        return done()
      })
  })

  it('POST /api/users/login should login OK', (done) => {
    
    findUserByEmail.mockReturnValue({ 
        email: 'matias.brascesco@globant.com', 
        password: encryptPass('abc'), 
        username: 'mnbd' 
    })
    req(app)
      .post('/api/users/login')
      .send({ 
          user: { 
              email: 'matias.brascesco@globant.com', 
              password: 'abc' 
            } 
        })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(200)
        return done()
      })
  })

  it('PUT /api/user should update', (done) => {
    findUserByEmail.mockReturnValueOnce(null)
    .mockReturnValue({ 
        email: 'matias.brascesco@globant.com', 
        password: encryptPass('abc'), 
        username: 'mnbd' 
    })
    updateUser.mockReturnValue({ 
        email: 'matias20.brascesco@globant.com', 
        password: encryptPass('abc'), 
        username: 'mnbd' 
    })
    req(app)
      .put('/api/user')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Token adfadsfasdf')
      .send({ 
          user: { 
                email: 'matias20.brascesco@globant.com', 
                password: 'abc', 
                username: 'mnbd' 
            } 
        })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  it('GET /api/user should get current user', (done) => {
    req(app)
      .get('/api/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(200)
        return done()
      })
  })
})

function encryptPass(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    return hashedPass
}