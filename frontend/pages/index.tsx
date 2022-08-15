import { useState } from "react"
import type { NextPage, GetServerSideProps } from 'next'
import jwt_decode from "jwt-decode";
import Head from 'next/head'
import { 
  Container,
  GeneralContainer,
  ActionsContainer,
} from '../styles/home/homePageStyles'
import { parseCookies } from 'nookies'
import DesktopNavbar from '../components/navbars/desktopNavbar'
import Canvas from '../components/canva/canvas'
import boy1Icon from "../public/images/avatars/boy_avatar1.png"
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Actions, Welcome } from '../components/home'
import CreateMatch from "../components/createMatch/createMatch"
import Matchs from "../components/home/Matchs/matchs"
import { api } from "../services/api"
import { UserInfoI } from "../interfaces/UserI";

import { MatchI } from "../interfaces/MatchI";

type Props = {
  matchs: MatchI[]
}

const Home: NextPage<Props> = (props) => {
  const [actionActivated, setActionActivated] = useState<string>("")
  const [matchs, setMatchs] = useState<MatchI[] | []>(props.matchs)
  const { user } = useContext(AuthContext)
  console.log(props.matchs)

  return (
    <Container isActionActivated={actionActivated.length ? true : false} >
      <Head>
        <title>Drawing app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Noto+Sans&family=Roboto&family=Roboto+Condensed:wght@300&display=swap" rel="stylesheet" />
      </Head>
      { actionActivated === "createMatch" ? <CreateMatch userId={user.id} close={() => setActionActivated("")} /> : null }
      <DesktopNavbar />
      <GeneralContainer>
        <Welcome user={{ name: user.name, pfp: boy1Icon.src }}/>
        <Matchs matchs={matchs} />
        <Actions setActionActivated={setActionActivated} />
      </GeneralContainer>
      {/* <Canvas color="yellow" /> */}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'drawingauth.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  const user: UserInfoI = jwt_decode(token);

  const { data } = await api.get(`http://localhost:8888/match/created/creatorid/${user.id}`) as { data: MatchI[] }

  const _props: Props = {
    matchs: data
  }

  return {
    props: _props
  }
}


export default Home
