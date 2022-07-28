import { FLOOR, BUILDING, BASE, DOOR } from "../constants";
import { Arc, Rect } from "../types";

class Elevator {
  private outerBg: Rect;
  private innerBg: Rect;
  private door: Rect;
  private arc: Arc;
  private arcRadius = 2;
  private dy = -1;
  private limitY = {
    top: FLOOR.rowGap,
    bottom: BUILDING.height - (BASE.height + FLOOR.height),
  };

  constructor(public ctx: CanvasRenderingContext2D) {
    this.outerBg = {
      x: (BUILDING.width - (DOOR.width + DOOR.border * 2)) / 2,
      y: this.limitY.bottom,
      width: DOOR.width + DOOR.border * 2,
      height: FLOOR.height,
      fillStyle: "#292e32",
    };

    this.innerBg = {
      x: this.outerBg.x + DOOR.border,
      y: this.outerBg.y + DOOR.border * 3,
      width: this.outerBg.width - DOOR.border * 2,
      height: this.outerBg.height - DOOR.border * 4,
      fillStyle: "#fff",
    };

    this.door = {
      x: this.innerBg.x,
      y: this.innerBg.y,
      width: (this.innerBg.width * 2) / 3,
      height: this.innerBg.height,
      fillStyle: "#bbb",
    };

    this.arc = {
      radius: this.arcRadius,
      x: this.outerBg.x + this.outerBg.width / 2,
      y: this.outerBg.y + DOOR.border + this.arcRadius,
      strokeStyle: "#1ff91f",
    };
  }

  open() {}

  // a Promise-based wrapper around "_moveToNextFloorWithCb"
  moveToNextFloor(dir: "up" | "down") {
    return new Promise((resolve) => {
      this._moveToNextFloorWithCb(dir, () => resolve(null));
    });
  }

  // moves the elevator to the next floor up or down
  // invokes the callback once it's done
  private _moveToNextFloorWithCb(dir: "up" | "down", cb?: () => void) {
    // to avoid dirtying the global variable
    let distanceCleared = 0;
    this.dy = dir === "up" ? -2 : 2;

    const move = () => {
      distanceCleared += this.dy;

      this.clear();
      this._updatePositionY();
      this.draw();

      const reached = Math.abs(distanceCleared) === FLOOR.height + FLOOR.rowGap;
      if (reached) return cb?.();

      // enqueue the next frame
      requestAnimationFrame(move);
    };

    move();
  }

  private _updatePositionY() {
    this.outerBg.y += this.dy;
    this.innerBg.y += this.dy;
    this.door.y += this.dy;
    this.arc.y += this.dy;
  }

  clear() {
    this.ctx.fillStyle = "#40e0d0";
    this.ctx.fillRect(
      this.outerBg.x,
      this.outerBg.y,
      this.outerBg.width,
      this.outerBg.height
    );
  }

  draw() {
    this._drawOuterBackground();
    this._drawInnerBackground();
    this._drawDoor();
    this._drawArc();
  }

  private _drawOuterBackground() {
    this.ctx.fillStyle = this.outerBg.fillStyle;
    this.ctx.fillRect(
      this.outerBg.x,
      this.outerBg.y,
      this.outerBg.width,
      this.outerBg.height
    );
  }

  private _drawInnerBackground() {
    this.ctx.fillStyle = this.innerBg.fillStyle;
    this.ctx.fillRect(
      this.innerBg.x,
      this.innerBg.y,
      this.innerBg.width,
      this.innerBg.height
    );
  }

  private _drawDoor() {
    this.ctx.fillStyle = this.door.fillStyle;
    this.ctx.fillRect(
      this.door.x,
      this.door.y,
      this.door.width,
      this.door.height
    );
  }

  private _drawArc() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.arc.strokeStyle;
    this.ctx.arc(this.arc.x, this.arc.y, this.arc.radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Elevator;
