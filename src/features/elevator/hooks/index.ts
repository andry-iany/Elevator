import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  elevatorMoved,
  elevatorRequested,
  selectAllNextMoves,
  selectIsElevatorRequestedAt,
  selectNextFloor,
} from "../slice";

export const useRequestElevator = () => {
  const dispatch = useAppDispatch();
  const requestElevator = useCallback(
    (floor: number) => {
      dispatch(elevatorRequested(floor));
    },
    [dispatch, elevatorRequested]
  );

  return requestElevator;
};

export const useMoveElevator = () => {
  const dispatch = useAppDispatch();
  const moveElevator = useCallback(() => {
    dispatch(elevatorMoved());
  }, [dispatch, elevatorMoved]);

  return moveElevator;
};

export const useIsElevatorRequestedAt = (floor: number) => {
  return useAppSelector((state) => selectIsElevatorRequestedAt(state, floor));
};

export const useSelectAllNextMoves = () => {
  return useAppSelector((state) => selectAllNextMoves(state));
};

export const useSelectNextFloor = () => {
  return useAppSelector((state) => selectNextFloor(state));
};
