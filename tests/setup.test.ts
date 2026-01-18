// tests/setup.test.ts
const request = require("supertest");
const app = require("../src/index");

let token;

beforeAll(async () => {
    const email = `test${Date.now()}@mail.com`; // email جديد كل مرة
    const password = "123456789";

    // Signup
    await request(app)
        .post("/api/auth/signup")
        .send({
            email,
            name: "Test User",
            password,
        });

    // Login
    const res = await request(app)
        .post("/api/auth/login")
        .send({ email, password });

    token = res.body.token;
});

// صدّر الـ token بالـ CommonJS
module.exports = { token };
