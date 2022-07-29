import { useEffect, useRef, useState } from "react";
import { BUILDING } from "../../constants";
import { useMoveElevator, useSelectNextFloor } from "../../hooks";
import Building from "../Building";

// THE USEEFFECT HOOK RUNS TWICE FOR SOME REASON THOUGH WE DON'T WANT TO RUN IT ONCE
// THIS IS JUST A WORKAROUND FOR NOW
let run = false;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatchElevatorMoved = useMoveElevator();
  const [building, setBuilding] = useState<Building | null>(null);
  const nextFloor = useSelectNextFloor();

  useEffect(() => {
    // WORKAROUND
    if (run) return;
    run = true;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = BUILDING.width;
    canvas.height = BUILDING.height;

    // draw building
    const building = new Building(ctx);
    building.draw();
    setBuilding(building);
  }, [canvasRef.current]);

  useEffect(() => {
    if (!building || nextFloor === undefined) return;
    building.moveElevatorTo(nextFloor).then(() => dispatchElevatorMoved());
  }, [building, nextFloor]);

  return (
    <div className="w-100 ">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
