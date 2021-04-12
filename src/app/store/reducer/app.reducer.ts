import { createReducer, on, Action } from "@ngrx/store";
import { TOASTTYPE } from "src/app/shared/generics/generic-model";
import { clearLoadingAction, setLoadingAction } from "../action/app.action";

export interface AppState {
  appLoading: boolean,
}
export const initialState: AppState = {
  appLoading: null,
};
const appReducer = createReducer(
  initialState,
  on(setLoadingAction, (state) => {
    return Object.assign({}, state, { appLoading: true });
  }),
  on(clearLoadingAction, (state) => {
    return Object.assign({}, state, { appLoading: null });
  })
);
export function AppReducer(state: AppState, action: Action) {
  return appReducer(state, action);
}