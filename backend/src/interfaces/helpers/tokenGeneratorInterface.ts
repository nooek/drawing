import { LoginReturn } from "../../types/UserLoginType";

interface TokenGeneratorInterface {
  generate(data: LoginReturn): string
}

export default TokenGeneratorInterface
