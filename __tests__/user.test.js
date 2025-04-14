const mongoose = require("mongoose");
const request = require("supertest");

const authService = require('../services/auth.service')

const app = require('../app');
// require('dotenv').config();

// Connecting to MongoDB before each test
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to MongoDB established for jest.")},
        err => { console.log("Failed to connect to MongoDB for Jest", err) }
    );
});

// Close connection to MongoDB
afterEach(async ()=>{
    await mongoose.connection.close();
});

describe("Requests for /api/users", ()=>{

    let token;

    beforeAll(()=>{
        user= {
            username: "admin",
            email: "admin@aueb.gr",
            roles: ["EDITOR", "READER", "ADMIN"]
        };
        token = authService.generateAccessToken(user);
    })
    // test('Returns all users')
    it('GET - Returns all users', async () =>{
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
    }, 5000);
});

descripe("Requests for /api/users/:username", () => {
    beforeAll(()=>{
        user= {
            username: "admin",
            email: "admin@aueb.gr",
            roles: ["EDITOR", "READER", "ADMIN"]
        };
        token = authService.generateAccessToken(user);
});

it("GET - Returns specific user", async()=>{
    const res = await request(app)
    .get('/api/users/user1')
    .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).tobeTruthy();
    expect(res.body.username).toBe('user1');
    expect(res.body.email).toBe('user1@aueb.gr');
})
});
