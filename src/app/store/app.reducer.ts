import { ActionReducerMap } from '@ngrx/store';
import { OnboardingReducer, OnboardingState } from '../modules/on-boarding/store/onboarding.reducer';

export interface AppState {
  onboarding: OnboardingState,
}
export const reducers: ActionReducerMap<AppState> = {
  onboarding: OnboardingReducer
};
