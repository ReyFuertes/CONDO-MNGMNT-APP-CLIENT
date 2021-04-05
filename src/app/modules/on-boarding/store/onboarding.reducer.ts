import { createReducer, on, Action } from "@ngrx/store";
import { ISimpleItem } from "src/app/shared/generics/generic-model";
import { IOccupant, IOnboardingPersonal } from "../on-boarding.model";
import { addOccupantAction, setOnboardingStepperAction } from "./onboarding.action";

export interface OnboardingState {
  stepper?: string,
  type?: ISimpleItem,
  personal?: IOnboardingPersonal,
  occupants?: IOccupant[]
}
export const initialState: OnboardingState = {
  stepper: null,
  type: null,
  personal: null,
  occupants: []
};
const onboardingReducer = createReducer(
  initialState,
  on(addOccupantAction, (state, action) => {
    let occupants = Object.assign([], state.occupants);
    if(!occupants.includes(action.response)) {
      occupants.push(action.response);
      return Object.assign({}, state, { occupants: occupants });
    } else {
      return Object.assign({}, state);
    }
  }),
  on(setOnboardingStepperAction, (state, action) => {
    return Object.assign({}, state, { stepper: action.step });
  }),
);
export function OnboardingReducer(state: OnboardingState, action: Action) {
  return onboardingReducer(state, action);
}