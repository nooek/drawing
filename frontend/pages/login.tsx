import React, { useContext, useState } from "react"
import { 
  Container,
  RegisterText,
  FormsContainer,
  InputsContainer,
  FormsInput,
  RegisterButton,
  Message
} from "../styles/register/registerPageStyles"
import { AuthContext } from "../contexts/AuthContext";

type LoginForms = {
  email: string;
  password: string;
}

const Login = () => {
  const [formsData, setFormsData] = useState<LoginForms>({
    email: "",
    password: ""
  })
  const [blockButton, setBlockButton] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const { login, setUser } = useContext(AuthContext)
  
  const handleLogin = async () => {
    const response = await login(formsData)
    if (response) {
      setMessage(response)
    }
  }

  return (
    <Container>
      <RegisterText>Login</RegisterText>
      <FormsContainer messageExists={message ? true : false}>
        <InputsContainer>
          <FormsInput 
            placeholder="Email"
            onChange={(e) => setFormsData({...formsData, email: e.target.value})}
          />
          <FormsInput 
            placeholder="Password"
            type="password"
            onChange={(e) => setFormsData({...formsData, password: e.target.value})}
          />
        </InputsContainer>
        <RegisterButton disabled={blockButton} onClick={() => handleLogin()}>Login</RegisterButton>
      </FormsContainer>
      {
        message ? <Message>{message}</Message> : null
      }
    </Container>
  )
}

export default Login;
