import { useEffect, useRef, useState } from "react";
import { waitFor } from "../../../../common/utils";
import { BUILDING } from "../../constants";
import {
  useMoveElevator,
  useOpenThenCloseElevator,
  useSelectElevatorStatus,
  useSelectIsFloorReached,
  useSelectNextFloor,
} from "../../hooks";
import Building from "../Building";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatchElevatorMoved = useMoveElevator();
  const [building, setBuilding] = useState<Building | null>(null);
  const status = useSelectElevatorStatus();
  const nextFloor = useSelectNextFloor();
  const isFloorReached = useSelectIsFloorReached();
  const dispatchOpenThenCloseElevator = useOpenThenCloseElevator();

  useEffect(() => {
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
    const elevator = building?.elevator;
    if (!elevator || status === "idle" || isFloorReached) return;
    elevator.moveToNextFloor(status).then(() => dispatchElevatorMoved());
  }, [building, status, nextFloor, isFloorReached]);

  useEffect(() => {
    const elevator = building?.elevator;
    if (!elevator || !isFloorReached) return;
    waitFor(1000)
      .then(() => elevator.open())
      .then(() => waitFor(2000))
      .then(() => elevator.close())
      .then(() => waitFor(200))
      .then(() => dispatchOpenThenCloseElevator());
  }, [dispatchOpenThenCloseElevator, isFloorReached]);

  return (
    <div className="w-100 ">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
