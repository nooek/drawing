
import { ClientRequest } from "http";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #33246f;
  font-family: "Roboto", sans-serif;
`;

export const LoginText = styled.h1`
  color: white;
  font-size: 55px;
  @media(max-width: 580px) {
    font-size: 12vw;
  }
`

interface FormsContainerI {
  messageExists: boolean
}

export const FormsContainer = styled.div<FormsContainerI>`
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.messageExists ? "30px" : null};
  @media(max-width: 580px) {
    width: 95%;
  }
`;

export const InputsContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const FormsInput = styled.input `
  width: 100%;
  height: 70px;
  border: 4px solid black;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: #C4CBCA;
  color: black;
  font-size: 15px;
  outline: none;
  font-weight: bold;
  :focus{
    transform: scale(1.02);
    border-radius: 8px;
  }
`

export const LoginButton = styled.button`
  width: 95%;
  height: 60px;
  background: #0A0F0D;
  color: white;
  font-size: 23px;
  border-radius: 5px;
  margin-top: 20px;
  border: 2px solid white;
  cursor: pointer;
  @media(max-width: 320px) {
    height: 50px;
    font-size: 18px;

  }
  :hover{
    transform: scale(1.01);
  }
`

export const Message = styled.h2 `
  font-size: 30px;
  color: white;
  @media(max-width: 580px) {
    font-size: 6vw;
  }
`
