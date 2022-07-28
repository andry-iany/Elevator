import { waitFor } from "../../../common/utils";
import { BASE, BUILDING, DOOR, FLOOR, FLOOR_COUNT } from "../constants";
import Elevator from "./Elevator";

class Building {
  constructor(public ctx: CanvasRenderingContext2D) {}

  draw() {
    // bg
    this._drawBackground();

    // floors
    for (let i = 0; i < FLOOR_COUNT; i++) {
      if (i === 0) {
        this._drawFloor(i, "left");
        this._drawDoor(i, "left");
        this._drawFloor(i, "right");
      } else {
        this._drawFloor(i, "right");
        this._drawDoor(i, "right");
        this._drawFloor(i, "left");
        this._drawDoor(i, "left");
      }
    }

    // base
    this._drawBase();

    // elevator
    this._drawElevator();
  }

  private _drawBackground() {
    this.ctx.fillStyle = "#40e0d0";
    this.ctx.fillRect(0, 0, BUILDING.width, BUILDING.height);
  }

  private _drawFloor(floorNumber = 0, position: "left" | "right") {
    this.ctx.fillStyle = "#ccc26b";
    const { x, y } = this._getFloorCoordinate(floorNumber, position);
    this.ctx.fillRect(x, y, FLOOR.width, FLOOR.height);
  }

  private _getFloorCoordinate(floorNumber = 0, leftOrRight: "left" | "right") {
    const x = leftOrRight === "left" ? 0 : FLOOR.width + FLOOR.colGap;
    const y =
      (FLOOR_COUNT - 1 - floorNumber) * (FLOOR.height + FLOOR.rowGap) +
      FLOOR.rowGap;
    return { x, y };
  }

  private _drawDoor(floorNumber = 0, leftOrRight: "left" | "right") {
    floorNumber === 0
      ? this._drawBasementDoor()
      : this._drawClassicDoor(floorNumber, leftOrRight);
  }

  private _drawBasementDoor() {
    const outer = {
      x: FLOOR.rowGap,
      y: BUILDING.height - (FLOOR.height + FLOOR.rowGap),
      width: FLOOR.width - FLOOR.rowGap * 2,
      height: FLOOR.height + FLOOR.rowGap,
    };
    const leftDoor = {
      x: outer.x + DOOR.border * 2,
      y: outer.y + DOOR.border,
      width: outer.width / 2 - DOOR.border * 3,
      height: outer.height - DOOR.border,
    };
    const rightDoor = {
      x: leftDoor.x + leftDoor.width + DOOR.border * 2,
      y: leftDoor.y,
      width: leftDoor.width,
      height: leftDoor.height,
    };
    // outer
    this.ctx.fillStyle = "#292e32";
    this.ctx.fillRect(outer.x, outer.y, outer.width, outer.height);

    // left and right
    this.ctx.fillStyle = "#bbb";
    this.ctx.fillRect(leftDoor.x, leftDoor.y, leftDoor.width, leftDoor.height);
    this.ctx.fillRect(
      rightDoor.x,
      rightDoor.y,
      rightDoor.width,
      rightDoor.height
    );
  }

  private _drawClassicDoor(floorNumber = 0, leftOrRight: "left" | "right") {
    // ctx.fillStyle = "#daa520";
    const { x: fx, y: fy } = this._getFloorCoordinate(floorNumber, leftOrRight);
    const x =
      leftOrRight === "left"
        ? fx + DOOR.mX
        : BUILDING.width - (DOOR.width + DOOR.mX);
    const y = fy + DOOR.mY;
    // outer
    this.ctx.fillStyle = "#b8860b";
    this.ctx.fillRect(x, y, DOOR.width, DOOR.height);

    // inner
    this.ctx.fillStyle = "#daa520";
    this.ctx.fillRect(
      x + DOOR.border,
      y + DOOR.border,
      DOOR.width - DOOR.border * 2,
      DOOR.height - DOOR.border * 2
    );
  }

  private _drawBase() {
    this.ctx.fillStyle = "#292e32";
    this.ctx.fillRect(
      0,
      BUILDING.height - BASE.height,
      BASE.width,
      BASE.height
    );
  }

  private async _drawElevator() {
    const elevator = new Elevator(this.ctx);
    elevator.draw();
    await waitFor(2000);
    await elevator.moveToNextFloor("up");
  }
}

export default Building;
