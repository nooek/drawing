import LoginInfoType from "../../types/UserLoginType";

interface TokenGeneratorInterface {
  generate(data: LoginInfoType): string
}

export default TokenGeneratorInterface
