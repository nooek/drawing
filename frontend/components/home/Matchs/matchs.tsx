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

const Matchs = () => {
  const matchs = useSelector((state: any) => state.matchs.matchs)
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  }
}

export default Matchs
