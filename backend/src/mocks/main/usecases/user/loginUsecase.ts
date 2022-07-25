import LoginUsecase from "../../../../main/usecases/user/login/loginUsecase";
import { mockFindByEmail } from "../../../../mocks/infra/user/userDbMock";
import { mockGenerate, mockDecode } from "../../../../mocks/helpers/tokenGeneratorMock";
import { mockCompare, mockHash } from "../../../../mocks/helpers/hashPasswordMock";
import { MissingParamError } from "../../../../utils/errors";
import { InvalidParamError, UnauthorizedError } from "../../../../utils/errors";

const loginUsecaseMock = new LoginUsecase(
  { findByEmail: mockFindByEmail },
  { generate: mockGenerate },
  { compare: mockCompare, hash: mockHash },
  MissingParamError,
  InvalidParamError,
  UnauthorizedError,
);

export default loginUsecaseMock;
