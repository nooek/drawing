import { ReactElement, useState } from "react";
import { 
  Container,
  CanvaContainer,
  CanvaPixels
} from "../../styles/canva/canvaStyles";

type Props = {
  width: number;
  height: number;
}

type MouseCoords = {
  x: number;
  y: number;
}

type PixelsDrawed = {
  color: string;
  positionX: number;
  positionY: number;
}

const Canva = ({ width, height }: Props) => {
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 })
  const [pixelsDrawed, setPixelsDrawed] = useState<PixelsDrawed[] | []>([])

  const generatePixels = (): Array<number> => {
    const numberOfPixels = []
    for(let i = 0; i < width * 1; i++) {
      numberOfPixels.push(i)
    }
    console.log(numberOfPixels.length)
    return numberOfPixels
  }

  console.log(mouseCoords)
  console.log(pixelsDrawed)

  return (
    <Container>
      <CanvaContainer
        onMouseMove={(e) => {
          setMouseCoords({
            x: e.clientX - e.currentTarget.offsetLeft,
            y: e.clientY - e.currentTarget.offsetTop
          })
        }}
        onClick={() => setPixelsDrawed([...pixelsDrawed, {
          positionX: mouseCoords.x,
          positionY: mouseCoords.y,
          color: "black"
        }])}
        width={width} 
        height={height}
      >
        {
          pixelsDrawed.map((each): ReactElement => {
            return <CanvaPixels 
              x={each.positionX}
              y={each.positionY}
              key={each.positionX + Math.random()} />
          })
        }
      </CanvaContainer>
    </Container>
  )

}

export default Canva;