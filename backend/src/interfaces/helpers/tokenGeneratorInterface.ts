import { LoginReturn } from "../../types/UserLoginType";

interface TokenGeneratorInterface {
  generate(data: LoginReturn): string
  decode(token: string): LoginReturn
}

export default TokenGeneratorInterface
