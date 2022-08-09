import { ActionButton, ActionContainer, ActionTitle } from "../../../styles/home/homePageStyles";

type Props = {
  title: string;
  buttonText: string;
  buttonClick: Function;
}

const Action = ({ title, buttonText, buttonClick }: Props) => {
  return (
    <ActionContainer>
      <ActionTitle>{title}</ActionTitle>
      <ActionButton onClick={() => buttonClick()}>{buttonText}</ActionButton>
    </ActionContainer>
  );
};

export default Action;
