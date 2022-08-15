import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { api } from "../../../services/api";
import {
  Container, 
  MatchsContainer,
  MatchTitle,
} from "./styles";
import MatchCard from "./matchCard";
import { MatchI } from "../../../store/matchs/action";

type Props = {
  matchs: MatchI[]
}

const Matchs = ({ matchs }: Props) => {
  if (matchs.length) {
    return (
      <Container>
        <MatchTitle>Your matchs</MatchTitle>
        <MatchsContainer>
          {
            matchs.map((match: MatchI) => <MatchCard match={match} key={match.id} />)
          }
        </MatchsContainer>
      </Container>
    )
  } else {
    return null
  }
}

export default Matchs
