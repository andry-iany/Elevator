import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ElevatorState } from "../types";

const initialState: ElevatorState = {
  currentFloor: 0,
  isFloorReached: false,
  status: "idle",
  toAscendTo: [],
  toDescendTo: [],
};

const slice = createSlice({
  name: "elevator",
  initialState,
  reducers: {
    elevatorRequested(state: ElevatorState, action: PayloadAction<number>) {
      const direction = getDirection(state, action.payload);
      const toFloor = action.payload;

      if (!direction) return;

      if (shouldAscend(direction)) {
        state.toAscendTo = addUnique(state.toAscendTo, toFloor).sort(
          (a, b) => a - b
        );
      } else {
        state.toDescendTo = addUnique(state.toDescendTo, toFloor).sort(
          (a, b) => b - a
        );
      }

      // update status
      if (state.status === "idle") state.status = direction;
    },
    elevatorMoved(state: ElevatorState) {
      // update current floor
      const dy = state.status === "ascending" ? 1 : -1;
      state.currentFloor += dy;

      // remove the floor if present
      if (
        state.toAscendTo[0] === state.currentFloor ||
        state.toDescendTo[0] === state.currentFloor
      ) {
        state.isFloorReached = true;
      }
    },
    elevatorOpenedThenClosed(state: ElevatorState) {
      if (state.toAscendTo[0] === state.currentFloor) {
        state.toAscendTo.shift();
      } else if (state.toDescendTo[0] === state.currentFloor) {
        state.toDescendTo.shift();
      }

      // reset
      state.isFloorReached = false;

      // update direction
      if (state.toAscendTo.length > 0) {
        state.status = "ascending";
      } else if (state.toDescendTo.length > 0) {
        state.status = "descending";
      } else {
        state.status = "idle";
      }
    },
  },
});

function getDirection(state: ElevatorState, toFloor: number) {
  if (state.currentFloor === toFloor) return undefined;
  return state.currentFloor < toFloor ? "ascending" : "descending";
}

function shouldAscend(direction: "ascending" | "descending") {
  return direction === "ascending";
}

// not optimal but works for smaller number
function addUnique<T>(arr: T[], value: T) {
  const set = new Set(arr).add(value);
  return Array.from(set);
}

export default slice.reducer;

export const { elevatorRequested, elevatorMoved, elevatorOpenedThenClosed } =
  slice.actions;

export const selectIsElevatorRequestedAt = (
  state: RootState,
  floor: number
) => {
  const elevator = state.elevator;
  return (
    elevator.toAscendTo.includes(floor) || elevator.toDescendTo.includes(floor)
  );
};

export const selectElevatorStatus = (state: RootState) => state.elevator.status;
export const selectIsFloorReached = (state: RootState) =>
  state.elevator.isFloorReached;

export const selectNextFloor = (state: RootState) => {
  const status = selectElevatorStatus(state);

  if (status === "ascending") {
    return state.elevator.currentFloor + 1;
  } else if (status === "descending") {
    return state.elevator.currentFloor - 1;
  }
  return undefined;
};
