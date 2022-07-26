export const mockHash = jest.fn((password: string) => {
  return "hash" + password;
});

export const mockCompare = jest.fn((password: string, hashPassword: string) => {
  if (password === hashPassword) return true;
  console.log(password, hashPassword);
  return false;
});

const mock = jest.fn().mockImplementation(() => {
  return {
    hash: mockHash,
    compare: mockCompare,
  };
});

export default mock;
