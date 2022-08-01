import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  elevatorMoved,
  elevatorRequested,
  selectIsElevatorRequestedAt,
  selectElevatorStatus,
  selectNextFloor,
  selectIsFloorReached,
  elevatorOpenedThenClosed,
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

export const useOpenThenCloseElevator = () => {
  const dispatch = useAppDispatch();
  const openThenCloseElevator = useCallback(() => {
    dispatch(elevatorOpenedThenClosed());
  }, [dispatch, elevatorOpenedThenClosed]);

  return openThenCloseElevator;
};

export const useIsElevatorRequestedAt = (floor: number) => {
  return useAppSelector((state) => selectIsElevatorRequestedAt(state, floor));
};

export const useSelectIsFloorReached = () => {
  return useAppSelector((state) => selectIsFloorReached(state));
};

export const useSelectElevatorStatus = () => {
  return useAppSelector((state) => selectElevatorStatus(state));
};

export const useSelectNextFloor = () => {
  return useAppSelector((state) => selectNextFloor(state));
};
