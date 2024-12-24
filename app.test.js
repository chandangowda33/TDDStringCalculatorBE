const request = require("supertest");
const app = require("./app"); // Import your Express app

describe("GET /calculate/:string", () => {
  it("should return the correct sum for two numbers", async () => {
    const response = await request(app).get("/calculate/1,2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Success",
      result: 3,
    });
  });

  it("should return the number itself if only one number is provided", async () => {
    const response = await request(app).get("/calculate/5");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "Success",
      result: 5,
    });
  });
});
