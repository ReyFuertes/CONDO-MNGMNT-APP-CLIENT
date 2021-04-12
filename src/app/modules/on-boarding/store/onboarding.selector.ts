import { createSelector } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';

export const selectedState = (state: RooState) => state.onboarding;
export const getOnboardingSubmittedSelector = createSelector(
  selectedState,
  state => state?.onboardingSubmitted
);
export const getDocumentsSelector = createSelector(
  selectedState,
  state => state?.documents
);
export const getOccupantsSelector = createSelector(
  selectedState,
  state => state?.occupants
);
export const getOnboardingStepperSelector = createSelector(
  selectedState,
  state => state?.stepper
);
