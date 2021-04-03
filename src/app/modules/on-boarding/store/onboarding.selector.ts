import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectedState = (state: AppState) => state.onboarding;
export const getOnboardingStepperSelector = createSelector(
  selectedState,
  state => state?.stepper
);