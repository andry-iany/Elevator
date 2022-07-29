import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ElevatorState } from "../types";

const initialState: ElevatorState = {
  lastFloorWhereIdle: 0,
  inSameDir: [],
  inOppositeDir: [],
};

const elevatorSlice = createSlice({
  name: "elevator",
  initialState,
  reducers: {
    elevatorRequested(state: ElevatorState, action: PayloadAction<number>) {
      const nextFloor = getNextFloor(state);

      const isFirstMove = nextFloor === undefined;
      const isInSameDir =
        Math.sign(state.lastFloorWhereIdle - Number(nextFloor)) ===
        Math.sign(state.lastFloorWhereIdle - action.payload);

      if (isFirstMove || isInSameDir) {
        state.inSameDir = addUnique(state.inSameDir, action.payload);
      } else {
        state.inOppositeDir = addUnique(state.inOppositeDir, action.payload);
      }

      console.log("same", [...state.inSameDir], "opposite", [
        ...state.inOppositeDir,
      ]);
    },

    elevatorMoved(state: ElevatorState) {
      console.log("moved.");
      console.log("Before:", [...state.inSameDir], [...state.inOppositeDir]);

      if (state.inSameDir.length > 0) {
        state.inSameDir.shift();
      } else {
        state.inOppositeDir.shift();
      }
      console.log("After:", [...state.inSameDir], [...state.inOppositeDir]);
    },
  },
});

// not optimal but works for smaller number
function addUnique<T>(arr: T[], value: T) {
  const set = new Set(arr).add(value);
  return Array.from(set);
}

function getNextFloor(state: ElevatorState) {
  return state.inSameDir[0] ?? state.inOppositeDir[0];
}

export default elevatorSlice.reducer;

export const { elevatorRequested, elevatorMoved } = elevatorSlice.actions;

const selectElevatorState = (state: RootState) => state.elevator;

export const selectNextFloor = createSelector(selectElevatorState, (state) =>
  getNextFloor(state)
);

export const selectIsElevatorRequestedAt = createSelector(
  [selectElevatorState, (_, floor: number) => floor],
  (state, floor) => {
    return (
      state.inSameDir.includes(floor) || state.inOppositeDir.includes(floor)
    );
  }
);

export const selectAllNextMoves = createSelector(
  [selectElevatorState],
  (state) => state.inSameDir.concat(state.inOppositeDir)
);
