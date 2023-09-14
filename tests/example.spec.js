const expect = require('chai').expect
const request = require('supertest')
const sandbox = require('sinon').createSandbox()
const rewire = require('rewire')
let app = require('../app')
const { generateAuthToken } = require('../src/services/auth.services');

describe('Get task endpoint', () => {
  let sampleResponse;
  let validToken;

  beforeEach(async () => {
    sampleResponse = [
      {
        "_id": "65031e0a22c767e38e714457", 
        "id": 1,
        "title": "3rd Add after delete",
        "description": "12345678a",
        "status": "COMPLETED",
        "__v": 0
      }
    ];

    validToken = await generateAuthToken('65009fa55f663e773b560353', 'WRITER');
  });

  afterEach(() => {
    app = rewire('../app');
    sandbox.restore();
  });

  describe('GET /tasks', () => {
    it('should fail if no token is sent', async () => {
      await request(app)
        .get('/tasks')
        .expect(500);
    });

    it('should retrieve tasks with a valid token', async () => {
     await request(app)
        .get('/tasks')
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjY1MDA5ZmE1NWY2NjNlNzczYjU2MDM1MyIsInJvbGUiOiJXUklURVIiLCJpYXQiOjE2OTQ3MTkzNjgsImV4cCI6MTY5NDcyMjk2OH0.kmZ7KBJbaENtJGJS17-Ga6DuXt7MWG-RynAJn0XET_w')
        .expect(200);

      // expect(res.body).to.be.an('array');
      // expect(res.body.length).to.equal(sampleResponse.length);
    });
  });
});
