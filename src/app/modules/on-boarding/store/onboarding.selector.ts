import { createSelector } from '@ngrx/store';
import { FmtToSimpleItem } from 'src/app/shared/util/formating';
import { RooState } from 'src/app/store/root.reducer';

export const selectedState = (state: RooState) => state.onboarding;
export const getOnboardingSelector = createSelector(
  selectedState,
  state => {
    const ob = {
      type: state?.type,
      personal: {
        ...state?.personal,
        buildingNo: state?.personal ? FmtToSimpleItem(state, 'buildingNo') : null,
        unitNo: state?.personal ? FmtToSimpleItem(state, 'unitNo') : null,
        parkingSlot: state?.personal ? FmtToSimpleItem(state, 'parkingSlot') : null,
        gender: state?.personal ? FmtToSimpleItem(state, 'gender') : null,
        idType: state?.personal ? FmtToSimpleItem(state, 'idType') : null,
        civilStatus: state?.personal ? FmtToSimpleItem(state, 'civilStatus') : null,
        occupantType: state?.personal ? FmtToSimpleItem(state, 'occupantType') : null
      },
      spouse: state?.spouse,
      occupants: state?.occupants,
      vehicles: state?.vehicles,
      documents: state?.documents,
    }
    
    debugger
    return ob;
  }
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
