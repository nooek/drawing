import { LoginReturn } from "../../types/UserLoginType";

export const mockGenerate = jest.fn((data: LoginReturn) => {
  const token = `token + ${data.email}`;
  return token;
});

export const mockDecode = jest.fn((token: string) => {
  return {
    email: `emailof${token}@gmail.com`,
    name: `nameof${token}123`
  }
})

const mock = jest.fn().mockImplementation(() => {
  return {
    generate: mockGenerate,
  };
});

export default mock;
