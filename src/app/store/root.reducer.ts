import { ActionReducerMap } from '@ngrx/store';
import { OnboardingReducer, OnboardingState } from '../modules/on-boarding/store/onboarding.reducer';
import { AppReducer, AppState } from './reducer/app.reducer';

export interface RooState {
  app: AppState,
  onboarding: OnboardingState,
}
export const reducers: ActionReducerMap<RooState> = {
  app: AppReducer,
  onboarding: OnboardingReducer
};
