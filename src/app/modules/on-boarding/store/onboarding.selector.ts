import { createSelector } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';

export const selectedState = (state: RooState) => state.onboarding;
export const getOnboardingSelector = createSelector(
  selectedState,
  state => {
    return  {
      type: state?.type,
      personal: state?.personal,
      spouse: state?.spouse,
      occupants: state?.occupants,
      vehicles: state?.vehicles,
      documents: state?.documents,
    }
  }
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
