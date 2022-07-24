import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface CanvaContainerI {
  width: number;
  height: number;
}

export const CanvaContainer = styled.div<CanvaContainerI>`
    /* console.log(props.width) */
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
`

interface CanvaPixelsI {
  x: number;
  y: number
}

export const CanvaPixels = styled.div`
  width: 10px;
  height: 10px;
  /* border-radius: 5px; */
  border: 0.1px solid black;
  background: black;
`

