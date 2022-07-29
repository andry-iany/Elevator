export interface Point {
  x: number;
  y: number;
}
export interface Size {
  width: number;
  height: number;
}
export interface WithFillStyle {
  fillStyle: string;
}
export interface WithStrokeStyle {
  strokeStyle: string;
}
export interface WithRadius {
  radius: number;
}

export type Rect = Point & Size & WithFillStyle;

export type Arc = Point & WithRadius & WithStrokeStyle;

// elevator state
export interface ElevatorState {
  lastFloorWhereIdle: number;
  status: "moving" | "idle";
  inSameDir: number[];
  inOppositeDir: number[];
}
