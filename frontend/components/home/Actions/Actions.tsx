import React from "react";
import { ActionsContainer } from "../../../styles/home/homePageStyles";
import Action from "./Action";

interface Props {
  setActionActivated: React.Dispatch<React.SetStateAction<string>>
}

const Actions = (props: Props) => {
  return (
    <ActionsContainer>
      <Action title="Create a new match" buttonText="Create" buttonClick={() => props.setActionActivated("createMatch")} />
      <Action title="Enter in a match" buttonText="Enter" buttonClick={() => props.setActionActivated("enterMatch")} />
    </ActionsContainer>
  )
}

export default Actions;
