const request = require("supertest");
const app = require("./app");

describe("String Calculator API", () => {
  test("should return the number itself for a single number", async () => {
    const response = await request(app).get("/calculate?string=1");
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(1);
  });

  test("should return the sum of two numbers separated by a comma", async () => {
    const response = await request(app).get("/calculate?string=1,5");
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(6);
  });

  test("should handle any amount of numbers", async () => {
    const response = await request(app).get("/calculate?string=1,2,3,4,5");
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(15);
  });

  test("should handle newlines as delimiters between numbers", async () => {
    // 1\\n2,3 in the JavaScript code translates to the query string: 1\n2,3
    const response = await request(app).get("/calculate?string=1\\n2,3");
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(6);
  });

  test("should support custom delimiters", async () => {
    const response = await request(app).get("/calculate?string=//;\\n1;2");
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(3);
  });

  test("should throw an exception for negative numbers", async () => {
    const response = await request(app).get("/calculate?string=-1,2,-3");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Negative numbers not allowed: -1,-3");
  });
  test("should ignore numbers bigger than 1000", async () => {
    const response = await request(app).get("/calculate?string=2,1001");
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(2);
  });
  test("should handle custom delimiters of any length", async () => {
    const response = await request(app).get(
      "/calculate?string=//[***]\\n1***2***3"
    );
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(6);
  });
});
