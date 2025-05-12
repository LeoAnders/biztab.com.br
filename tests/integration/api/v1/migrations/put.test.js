import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("PUT /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving method not allowed error handling", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Method not allowed for this endpoint",
        action:
          "Please check if you are using the correct HTTP method for this endpoint",
        status_code: 405,
      });
    });
  });
});
