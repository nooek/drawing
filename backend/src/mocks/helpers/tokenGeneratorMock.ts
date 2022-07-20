import { LoginReturn } from "../../types/UserLoginType";

export const mockGenerate = jest.fn((data: LoginReturn) => {
  const token = `token + ${data.id}`;
  return token;
});

const mock = jest.fn().mockImplementation(() => {
  return {
    generate: mockGenerate,
  };
});

export default mock;
