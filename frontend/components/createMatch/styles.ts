import styled from "styled-components";
import { chakra, Input, NumberInput, NumberInputField, Select, Button } from '@chakra-ui/react'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backdrop-filter: blur(10px);
`;

export const CreateMatchContainer = styled.div`
  width: 700px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: calc(50% - 300px);
  left: calc(50% - 350px);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(221,221,221,1) 46%, rgba(210,210,210,1) 65%);
  backdrop-filter: blur(50px);
  border-radius: 20px;
  box-shadow: 6px 6px 19px black;
  border: 4px solid white;
`

export const TitleContainer = styled.div`
  width: 100%;
  height: 100px;
  text-align: center;
  margin-top: 30px;
`

export const Title = styled.h2`
  font-size: 50px;
  color: black;
  font-family: 'Roboto';
`

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const FormInput = chakra(Input, {
  baseStyle: {
    width: "90%",
    height: "60px",
    border: "3px solid black",
    marginBottom: "20px",
    fontSize: "20px"
  }
})

export const MaxPlayersInfoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
`

export const MaxPlayersInfoTitle = styled.h2`
  margin-left: 30px;
  font-size: 19px;
  color: black;
  margin-bottom: 5px;
  font-weight: bold;
`

export const MaxPlayersInputContainer = chakra(NumberInput, {
  baseStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
})

export const MaxPlayersInput = chakra(NumberInputField, {
  baseStyle: {
    width: "90%",
    height: "60px",
    border: "3px solid black",
    marginBottom: "20px",
    fontSize: "20px",
  }
})

export const SelectCategory = chakra(Select, {
  baseStyle: {
    height: "60px",
    zIndex: "9",
    border: "3px solid black",
    fontSize: "20px",
  }
})

export const ButtonsContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  position: absolute;
  align-items: center;
  justify-content: space-around;
  bottom: 20px;
`

export const CreateButton = chakra(Button,  {
  baseStyle: {
    width: "49%",
    height: "60px",
    fontSize: "25px",
  }
})

export const CancelButton = chakra(Button,  {
  baseStyle: {
    width: "49%",
    height: "60px",
    fontSize: "25px",
  }
})
