import { createSelector } from "@ngrx/store";
import * as fromNotification from '../reducer/notification.reducer';
import { RooState } from "../root.reducer";

export const selectedState = (state: RooState) => state.notification;
export const getSuccessSelector = createSelector(
  selectedState,
  fromNotification?.getNotification
);