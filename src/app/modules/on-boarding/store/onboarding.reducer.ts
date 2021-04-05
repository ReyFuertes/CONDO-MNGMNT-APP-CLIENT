import { createReducer, on, Action } from "@ngrx/store";
import { ISimpleItem } from "src/app/shared/generics/generic-model";
import { IOccupant, IOnboardingPersonal } from "../on-boarding.model";
import { addOccupantAction, removeOccupantAction, setOnboardingStepperAction } from "./onboarding.action";
import * as _ from 'lodash';

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
  on(removeOccupantAction, (state, action) => {
    let occupants: IOccupant[] = Object.assign([], state.occupants);
    let match = occupants.find(o => action?.item?.name === o?.name);

    if (match) {
      _.remove(occupants, { name: match?.name });
    }

    return Object.assign({}, state, { occupants });
  }),
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