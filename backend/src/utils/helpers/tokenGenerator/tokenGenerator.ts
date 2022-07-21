import jwt, { Secret } from "jsonwebtoken"
import jwt_decode from "jwt-decode"
import TokenGeneratorInterface from "../../../interfaces/helpers/tokenGeneratorInterface"
import { LoginReturn } from "../../../types/UserLoginType"

export default class TokenGenerator implements TokenGeneratorInterface {
  generate(data: LoginReturn) {
    const token = jwt.sign(data, process.env.TOKEN_KEY as Secret)
    
    if (token) return token
    throw new Error("Token could not be created")
  }

  decode(token: string) {
    const decoded: LoginReturn = jwt_decode(token)

    if (decoded) return decoded
    throw new Error("Token couldn't be decoded")
  }
}
