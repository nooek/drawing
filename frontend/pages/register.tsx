import React, { useState } from "react"
import axios from "axios"
import { 
  Container,
  LoginText,
  FormsContainer,
  InputsContainer,
  FormsInput,
  LoginButton,
  Message
} from "../styles/login/loginPageStyles"

type RegisterForms = {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const [formsData, setFormsData] = useState<RegisterForms>({
    name: "",
    email: "",
    password: ""
  })
  const [blockButton, setBlockButton] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  
  const register = () => {
    setBlockButton(true)
    axios.post("http://localhost:8888/user", {
      userData: formsData
    }).then(res => {
      if (res.data.statusCode === 200) {
        setMessage("You can login now :)")
        setBlockButton(false)
      }
    }).catch(err => {
      if (err.response.data.message !== message) setMessage(err.response.data.message)
      setBlockButton(false)
    })
  }

  console.log(blockButton)

  return (
    <Container>
      <LoginText>Register</LoginText>
      <FormsContainer messageExists={message ? true : false}>
        <InputsContainer>
          <FormsInput 
            placeholder="Name" 
            onChange={(e) => setFormsData({...formsData, name: e.target.value})}
          />
          <FormsInput 
            placeholder="Email"
            onChange={(e) => setFormsData({...formsData, email: e.target.value})}
          />
          <FormsInput 
            placeholder="Password"
            onChange={(e) => setFormsData({...formsData, password: e.target.value})}
          />
        </InputsContainer>
        <LoginButton disabled={blockButton} onClick={() => register()}>Register</LoginButton>
      </FormsContainer>
      {
        message ? <Message>{message}</Message> : null
      }
    </Container>
  )
}

export default Register;
