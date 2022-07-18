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
  const [message, setMessage] = useState<string>("")
  
  const register = () => {
    setMessage("")
    axios.post("http://localhost:8888/user", {
      userData: formsData
    }).then(res => {
      if (res.data.statusCode === 200) {
        setMessage("You can login now :)")
      }
    }).catch(err => {
      setMessage(err.response.data.message)
    })
  }

  console.log(formsData)

  return (
    <Container>
      <RegisterText>Register</RegisterText>
      <FormsContainer>
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
        <RegisterButton onClick={() => register()}>Register</RegisterButton>
      </FormsContainer>
      {
        message ? <Message>{message}</Message> : null
      }
    </Container>
  )
}

export default Register;
