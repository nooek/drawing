import { useEffect } from "react"
import { useCanvas } from "../../contexts/CanvasContext"

type Props = {
  color: string;
}

const Canvas = ({ color }: Props) => {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw
  } = useCanvas()

  useEffect(() => {
    console.log(prepareCanvas)
    prepareCanvas({ color: color, width: 2 }, { width: 400, height: 400 })
  }, [])

  return (
    <canvas
      style={{border: "2px solid white"}}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  )
}

export default Canvas;
