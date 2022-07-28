export const FLOOR = {
  width: 100,
  height: 60,
  rowGap: 10,
  colGap: 100,
} as const;

export const FLOOR_COUNT = 7; // including basement

export const DOOR = {
  width: 40,
  height: 40,
  mY: 10,
  mX: 40,
  border: 3,
} as const; // mY => top; mX => in the !side of elevator

export const BASE = {
  width: FLOOR.width * 2 + FLOOR.colGap + 40,
  height: 20,
} as const;

export const BUILDING = {
  width: FLOOR.width * 2 + FLOOR.colGap,
  height: (FLOOR.height + FLOOR.rowGap) * FLOOR_COUNT + BASE.height,
} as const;
