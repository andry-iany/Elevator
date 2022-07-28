import { useEffect, useRef } from "react";

const floor = { width: 100, height: 60, rowGap: 10, colGap: 100 };
const door = { width: 40, height: 40, mY: 10, mX: 40, border: 3 }; // mY => top; mX => in the !side of elevator
const floorCount = 7; // including basement
const base = { width: floor.width * 2 + floor.colGap + 40, height: 20 };
const building = {
  width: floor.width * 2 + floor.colGap,
  height: (floor.height + floor.rowGap) * floorCount + base.height,
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = building.width;
    canvas.height = building.height;

    // bind methods to the context
    const drawFloor = defaultDrawFloor.bind(null, ctx);
    const drawBase = defaultDrawBase.bind(null, ctx);
    const drawDoor = defaultDrawDoor.bind(null, ctx);
    const drawBuildingBg = defaultDrawBuildingBg.bind(null, ctx);
    const drawElevator = defaultDrawElevator.bind(null, ctx);

    // bg
    drawBuildingBg();

    // floors
    for (let i = 0; i < floorCount; i++) {
      if (i === 0) {
        drawFloor(i, "left");
        drawDoor(i, "left");
        drawFloor(i, "right");
      } else {
        drawFloor(i, "right");
        drawDoor(i, "right");
        drawFloor(i, "left");
        drawDoor(i, "left");
      }
    }

    // base
    drawBase();

    // elevator
    drawElevator();
  }, []);

  return (
    <div className="w-100 ">
      <canvas ref={canvasRef} />
    </div>
  );
};

const defaultDrawElevator = (ctx: CanvasRenderingContext2D) => {
  const outer = {
    x: (building.width - (door.width + door.border * 2)) / 2,
    y: floor.rowGap,
    width: door.width + door.border * 2,
    height: floor.height,
  };

  const inner = {
    x: outer.x + door.border,
    y: outer.y + door.border * 3,
    width: outer.width - door.border * 2,
    height: outer.height - door.border * 4,
  };

  const radius = 2;
  const arc = {
    radius,
    x: outer.x + outer.width / 2,
    y: outer.y + door.border + radius,
  };

  // outer
  ctx.fillStyle = "#292e32";
  ctx.fillRect(outer.x, outer.y, outer.width, outer.height);

  // inner open
  ctx.fillStyle = "#fff";
  ctx.fillRect(inner.x, inner.y, inner.width, inner.height);

  // inner closed
  ctx.fillStyle = "#bbb";
  ctx.fillRect(inner.x, inner.y, (inner.width * 2) / 3, inner.height);

  // arc
  ctx.beginPath();
  ctx.strokeStyle = "#1ff91f";
  ctx.arc(arc.x, arc.y, arc.radius, 0, Math.PI * 2);
  ctx.stroke();
};

const defaultDrawBuildingBg = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#40e0d0";
  ctx.fillRect(0, 0, building.width, building.height);
};

const defaultDrawBase = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#292e32";
  ctx.fillRect(0, building.height - base.height, base.width, base.height);
};

const defaultDrawFloor = (
  ctx: CanvasRenderingContext2D,
  floorNumber = 0,
  position: "left" | "right"
) => {
  ctx.fillStyle = "#ccc26b";
  const { x, y } = getFloorCoordinate(floorNumber, position);
  ctx.fillRect(x, y, floor.width, floor.height);
};

const getFloorCoordinate = (floorNumber = 0, position: "left" | "right") => {
  const x = position === "left" ? 0 : floor.width + floor.colGap;
  const y =
    (floorCount - 1 - floorNumber) * (floor.height + floor.rowGap) +
    floor.rowGap;
  return { x, y };
};

const defaultDrawDoor = (
  ctx: CanvasRenderingContext2D,
  floorNumber = 0,
  position: "left" | "right"
) => {
  floorNumber === 0
    ? drawBasementDoor(ctx)
    : drawClassicDoor(ctx, floorNumber, position);
};

const drawBasementDoor = (ctx: CanvasRenderingContext2D) => {
  const outer = {
    x: floor.rowGap,
    y: building.height - (floor.height + floor.rowGap),
    width: floor.width - floor.rowGap * 2,
    height: floor.height + floor.rowGap,
  };
  const leftDoor = {
    x: outer.x + door.border * 2,
    y: outer.y + door.border,
    width: outer.width / 2 - door.border * 3,
    height: outer.height - door.border,
  };
  const rightDoor = {
    x: leftDoor.x + leftDoor.width + door.border * 2,
    y: leftDoor.y,
    width: leftDoor.width,
    height: leftDoor.height,
  };
  // outer
  ctx.fillStyle = "#292e32";
  ctx.fillRect(outer.x, outer.y, outer.width, outer.height);

  // left and right
  ctx.fillStyle = "#bbb";
  ctx.fillRect(leftDoor.x, leftDoor.y, leftDoor.width, leftDoor.height);
  ctx.fillRect(rightDoor.x, rightDoor.y, rightDoor.width, rightDoor.height);
};

const drawClassicDoor = (
  ctx: CanvasRenderingContext2D,
  floorNumber = 0,
  position: "left" | "right"
) => {
  // ctx.fillStyle = "#daa520";
  const { x: fx, y: fy } = getFloorCoordinate(floorNumber, position);
  const x =
    position === "left"
      ? fx + door.mX
      : building.width - (door.width + door.mX);
  const y = fy + door.mY;
  // outer
  ctx.fillStyle = "#b8860b";
  ctx.fillRect(x, y, door.width, door.height);

  // inner
  ctx.fillStyle = "#daa520";
  ctx.fillRect(
    x + door.border,
    y + door.border,
    door.width - door.border * 2,
    door.height - door.border * 2
  );
};

export default Canvas;
