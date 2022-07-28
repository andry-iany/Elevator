import {
  createSlice,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

const toastAdapter = createEntityAdapter<any>({
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

const initialState = toastAdapter.getInitialState();

const toastSlice = createSlice({
  initialState,
  name: "toasts",
  reducers: {},
});

export default toastSlice.reducer;

export const {} = toastSlice.actions;

// export const { selectById: selectToastById, selectAll: selectAllToasts } =
//   toastAdapter.getSelectors<RootState>((state) => state.toast);
