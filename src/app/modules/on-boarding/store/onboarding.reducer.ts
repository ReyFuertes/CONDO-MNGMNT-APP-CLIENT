import { createReducer, on, Action } from "@ngrx/store";
import { ISimpleItem } from "src/app/shared/generics/generic-model";
import { IOnboardingOccupant, IOnboarding, IOnboardingDocument, IOnboardingPersonal, IOnboardingSpouse, IOnboardingVehicle } from "../on-boarding.model";
import { addDocumentsAction, addToOccupantAction, addToPersonalAction, addToSpouseAction, addToVehiclesAction, clearStepperAction, createOnboardingSuccessAction, removeOccupantAction, setOnboardingStepperAction, addToOccupantsAction, addToTypeAction, getOnboardingByIdSuccessAction, updateOnboardingPersonalValuesAction, updateOnboardingSpouseValuesAction, updateOnboardingOccupantValuesAction, updateOnboardingVehicleValuesAction, updateOnboardingDocumentsValuesAction } from "./onboarding.action";
import * as _ from 'lodash';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { OnBoardingType } from "src/app/models/onboarding.model";

export const adapter: EntityAdapter<IOnboarding> = createEntityAdapter<IOnboarding>({});
export interface OnboardingState extends EntityState<IOnboarding> {
  stepper?: string,
  type?: OnBoardingType,
  personal?: IOnboardingPersonal,
  spouse?: IOnboardingSpouse,
  vehicles?: IOnboardingVehicle[],
  occupants?: IOnboardingOccupant[],
  documents?: any,
  documentsToUpload?: any,
  onboardingSubmitted?: boolean,
  onboardingLoaded?: boolean
}
export const initialState: OnboardingState = adapter.getInitialState({
  stepper: null,
  type: null,
  personal: null,
  spouse: null,
  occupants: [],
  documents: null,
  documentsToUpload: null,
  vehicles: null,
  onboardingSubmitted: null,
  onboardingLoaded: null
});

const onboardingReducer = createReducer(
  initialState,
  on(updateOnboardingDocumentsValuesAction, (state, action) => {
    return Object.assign({}, state, { documentsToUpload: action?.payload });
  }),
  on(updateOnboardingVehicleValuesAction, (state, action) => {
    return Object.assign({}, state, { vehicles: action?.payload });
  }),
  on(updateOnboardingOccupantValuesAction, (state, action) => {
    return Object.assign({}, state, { occupants: action?.payload });
  }),
  on(updateOnboardingSpouseValuesAction, (state, action) => {
    return Object.assign({}, state, { spouse: action?.payload?.spouse });
  }),
  on(updateOnboardingPersonalValuesAction, (state, action) => {
    return Object.assign({}, state, { personal: action?.payload?.personal });
  }),
  on(getOnboardingByIdSuccessAction, (state, action) => {
    const onboarding: IOnboarding = {
      id: action?.response?.id,
      type: action?.response?.type,
      personal: action?.response?.personal,
      spouse: action?.response?.spouse,
      occupants: action?.response?.occupants,
      documents: action?.response?.documents,
      vehicles: action?.response?.vehicles,
    };
    return Object.assign({}, state, onboarding);
  }),
  on(getOnboardingByIdSuccessAction, (state) => {
    return Object.assign({}, state, { onboardingLoaded: true });
  }),
  on(addToTypeAction, (state, action) => {
    return Object.assign({}, state, { type: action.payload });
  }),
  on(addToOccupantsAction, (state, action) => {
    return Object.assign({}, state, { occupants: action.payload });
  }),
  on(addToVehiclesAction, (state, action) => {
    return Object.assign({}, state, { vehicles: action.payload });
  }),
  on(addToSpouseAction, (state, action) => {
    return Object.assign({}, state, { spouse: action.payload });
  }),
  on(addToPersonalAction, (state, action) => {
    return Object.assign({}, state, { personal: action.payload });
  }),
  on(clearStepperAction, (state) => {
    return Object.assign({}, state, { stepper: null });
  }),
  on(createOnboardingSuccessAction, (state, action) => {
    return adapter.addOne(action.response, state)
  }),
  on(createOnboardingSuccessAction, (state) => {
    return Object.assign({}, state, { onboardingSubmitted: true });
  }),
  on(addDocumentsAction, (state, action) => {
    return Object.assign({}, state, { addDocumentsAction: action.documents });
  }),
  on(removeOccupantAction, (state, action) => {
    let occupants: IOnboardingOccupant[] = Object.assign([], state.occupants);
    let match = occupants.find(o => action?.item?.name === o?.name);
    if (match) {
      _.remove(occupants, { name: match?.name });
    }
    return Object.assign({}, state, { occupants });
  }),
  on(addToOccupantAction, (state, action) => {
    let occupants = Object.assign([], state.occupants);
    if (!occupants.includes(action.response)) {
      occupants.push(action.response);
      return Object.assign({}, state, { occupants: occupants });
    } else {
      return Object.assign({}, state);
    }
  }),
  on(setOnboardingStepperAction, (state, action) => {
    return Object.assign({}, state, { stepper: action.step });
  })
);
export function OnboardingReducer(state: OnboardingState, action: Action) {
  return onboardingReducer(state, action);
}