import { FLOOR, BUILDING, BASE, DOOR } from "../constants";
import { Arc, Rect } from "../types";

class Elevator {
  private outer: Rect;
  private innerBg: Rect;
  private innerDoor: Rect;
  private arc: Arc;
  private signRadius = 2;
  private dy = -1;
  private limitY = {
    top: FLOOR.rowGap,
    bottom: BUILDING.height - (BASE.height + FLOOR.height),
  };

  constructor(public ctx: CanvasRenderingContext2D) {
    this.outer = {
      x: (BUILDING.width - (DOOR.width + DOOR.border * 2)) / 2,
      y: this.limitY.bottom,
      width: DOOR.width + DOOR.border * 2,
      height: FLOOR.height,
      fillStyle: "#292e32",
    };

    this.innerBg = {
      x: this.outer.x + DOOR.border,
      y: this.outer.y + DOOR.border * 3,
      width: this.outer.width - DOOR.border * 2,
      height: this.outer.height - DOOR.border * 4,
      fillStyle: "#fff",
    };

    this.innerDoor = {
      x: this.innerBg.x,
      y: this.innerBg.y,
      width: (this.innerBg.width * 2) / 3,
      height: this.innerBg.height,
      fillStyle: "#bbb",
    };

    this.arc = {
      radius: this.signRadius,
      x: this.outer.x + this.outer.width / 2,
      y: this.outer.y + DOOR.border + this.signRadius,
      strokeStyle: "#1ff91f",
    };
  }

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
    this.outer.y += this.dy;
    this.innerBg.y += this.dy;
    this.innerDoor.y += this.dy;
    this.arc.y += this.dy;
  }

  clear() {
    this.ctx.fillStyle = "#40e0d0";
    this.ctx.fillRect(
      this.outer.x,
      this.outer.y,
      this.outer.width,
      this.outer.height
    );
  }

  draw() {
    this._drawOuter();
    this._drawInnerBacground();
    this._drawInnerDoor();
    this._drawArc();
  }

  private _drawOuter() {
    this.ctx.fillStyle = this.outer.fillStyle;
    this.ctx.fillRect(
      this.outer.x,
      this.outer.y,
      this.outer.width,
      this.outer.height
    );
  }

  private _drawInnerBacground() {
    this.ctx.fillStyle = this.innerBg.fillStyle;
    this.ctx.fillRect(
      this.innerBg.x,
      this.innerBg.y,
      this.innerBg.width,
      this.innerBg.height
    );
  }

  private _drawInnerDoor() {
    this.ctx.fillStyle = this.innerDoor.fillStyle;
    this.ctx.fillRect(
      this.innerDoor.x,
      this.innerDoor.y,
      this.innerDoor.width,
      this.innerDoor.height
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
