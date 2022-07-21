import React, { useState } from "react"
import axios from "axios"
import { 
  Container,
  RegisterText,
  FormsContainer,
  InputsContainer,
  FormsInput,
  RegisterButton,
  Message
} from "../styles/registerPageStyles"

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
  
  const login = () => {
    setBlockButton(true)
    axios.post("http://localhost:8888/user/login", {
      loginInfo: formsData
    }).then(res => {
      if (res.status === 200) {
        console.log(res)
        setMessage("")
        setBlockButton(false)
      }
    }).catch(err => {
      if (err.response.data.message !== message) setMessage(err.response.data.message)
      setBlockButton(false)
    })
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
        <RegisterButton onClick={() => login()}>Login</RegisterButton>
      </FormsContainer>
      {
        message ? <Message>{message}</Message> : null
      }
    </Container>
  )
}

export default Login;
