import { createSelector } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';

export const selectedState = (state: RooState) => state.app;
export const isLoadingSelector = createSelector(
  selectedState,
  state => state?.appLoading
);
