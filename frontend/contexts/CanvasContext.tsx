import React, {
  createContext,
  CanvasHTMLAttributes,
  HTMLAttributeAnchorTarget,
  HTMLAttributeReferrerPolicy,
  useContext,
  useRef,
  useState,
  RefObject,
} from "react";

type LineConfig = {
  color: string;
  width: number;
};

type CanvasConfig = {
  width: number;
  height: number;
};

interface CanvasContextI {
  canvasRef: RefObject<HTMLCanvasElement>;
  contextRef: any;
  prepareCanvas: (lineConfig: LineConfig, canvasConfig: CanvasConfig) => void;
  startDrawing: ({ nativeEvent }: any) => void;
  finishDrawing: () => void;
  clearCanvas: ({ nativeEvent }: any) => void;
  draw: ({ nativeEvent }: any) => void;
}

const CanvasContext = createContext({} as CanvasContextI);

export const CanvasProvider = ({ children }: any) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<any>(null);

  const prepareCanvas = (lineConfig: LineConfig, canvasConfig: CanvasConfig) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasConfig.width * 2;
    canvas.height = canvasConfig.height * 2;
    canvas.style.width = `${canvasConfig.width}px`;
    canvas.style.height = `${canvasConfig.height}px`;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = lineConfig.color;
    context.lineWidth = lineConfig.width;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
