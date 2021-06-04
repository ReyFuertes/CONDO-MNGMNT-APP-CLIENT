import { createSelector } from '@ngrx/store';
import { FmtToSimpleItem, FmtPayloadToForm } from 'src/app/shared/util/formating';
import { RooState } from 'src/app/store/root.reducer';

export const selectedState = (state: RooState) => state.onboarding;
export const onboardingLoadedSelector = createSelector(
  selectedState,
  state => state?.onboardingLoaded
);
export const getOnboardingSelector = createSelector(
  selectedState,
  state => FmtPayloadToForm(state)
);
export const getOnboardingTypeSelector = createSelector(
  selectedState,
  state => state?.type
);
export const getOnboardingVehicleSelector = createSelector(
  selectedState,
  state => state?.vehicles
);
export const getOnboardingSpouseSelector = createSelector(
  selectedState,
  state => state?.spouse
);
export const getOnboardingPersonalSelector = createSelector(
  selectedState,
  state => state?.personal
);
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
