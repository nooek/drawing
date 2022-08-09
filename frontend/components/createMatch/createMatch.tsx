import { Select } from "@chakra-ui/react";
import { useState } from "react";
import {
  Container,
  CreateMatchContainer,
  TitleContainer,
  Title,
  FormContainer,
  FormInput,
  MaxPlayersInfoContainer,
  MaxPlayersInfoTitle,
  MaxPlayersInputContainer,
  MaxPlayersInput,
  SelectCategory,
  ButtonsContainer,
  CreateButton,
  CancelButton
} from "./styles";

type Props = {
  close: Function;
}

type MatchType = {
  name: string;
  category: string;
  maxPlayers: number;
  password?: string;
}

const CreateMatch = ({ close }: Props) => {
  const [match, setMatch] = useState<MatchType>({
    name: "",
    category: "",
    maxPlayers: 2,
  })

  const createMatch = () => {

  }

  console.log(match)

  return (
    <Container>
      <CreateMatchContainer>
        <TitleContainer>
          <Title>Create a new match</Title>
        </TitleContainer>
        <FormContainer>
          <FormInput variant="filled" placeholder="Name" onChange={(e) => setMatch({...match, name: e.target.value})} />
          <MaxPlayersInfoContainer>
            <MaxPlayersInfoTitle>Max Players (min: 2 / max: 12)</MaxPlayersInfoTitle>
            <MaxPlayersInputContainer variant="filled" step={1} defaultValue={2} min={2} max={12} onChange={(n) => setMatch({...match, maxPlayers: parseInt(n)})}>
              <MaxPlayersInput />
            </MaxPlayersInputContainer>
          </MaxPlayersInfoContainer>
          <FormInput variant="filled" placeholder="Password (not required)" onChange={(e) => setMatch({...match, password: e.target.value})} />
          <SelectCategory variant="filled" placeholder="Select category" onChange={(e) => setMatch({...match, category: e.target.value})} >
            <option value="cartoons">Cartoons</option>
            <option value="vehicles">Vehicles</option>
            <option value="series">Series</option>
            <option value="games">Games</option>
            <option value="objects">Objects</option>
            <option value="random">Random</option>
          </SelectCategory>
          <ButtonsContainer>
            <CreateButton colorScheme="blue" onClick={() => createMatch()}>Create</CreateButton>
            <CancelButton colorScheme="red" onClick={() => close()}>Cancel</CancelButton>
          </ButtonsContainer>
        </FormContainer>
      </CreateMatchContainer>
    </Container>
  );
};

export default CreateMatch;
