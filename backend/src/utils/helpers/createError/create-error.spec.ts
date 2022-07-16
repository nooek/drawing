import createError from "./createError";

describe("Test if create error creates a valid error object", () => {
  it("Should create a valid error object", () => {
    const params = {
      paramName: "username",
      messageToClient: "Username is missing",
      statusCode: 400,
    };

    const error = createError(params, "Missing Param")

    expect(error.messageToClient).toBe(params.messageToClient)
    expect(error.statusCode).toBe(params.statusCode)
  });
});
