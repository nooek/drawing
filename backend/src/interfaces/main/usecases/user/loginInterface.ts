import { LoginInfoType, LoginReturn } from "../../../../types/UserLoginType";

interface LoginInterface {
  execute(loginInfo: LoginInfoType): Promise<{ returnData: LoginReturn, token: string }>; 
}

export default LoginInterface;
