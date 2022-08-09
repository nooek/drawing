import { WelcomeContainer, WelcomePfp, WelcomeText } from "../../styles/home/homePageStyles";

type User = {
  name: string;
  pfp: string;
}

type Props = {
  user: User;
}

const Welcome = ({ user }: Props) => {
  return (
    <WelcomeContainer>
      <WelcomeText>Welcome {user.name}!</WelcomeText>
      <WelcomePfp src={user.pfp} />
    </WelcomeContainer>
  )
}

export default Welcome;
