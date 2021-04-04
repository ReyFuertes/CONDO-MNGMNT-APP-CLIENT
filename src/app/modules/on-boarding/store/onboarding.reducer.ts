import { createReducer, on, Action } from "@ngrx/store";
import { ISimpleItem } from "src/app/shared/generics/generic-model";
import { setOnboardingStepperAction } from "./onboarding.action";

export interface OnboardingState {
  stepper?: string,
  type?: ISimpleItem,
  personal?: any
}
export const initialState: OnboardingState = {
  stepper: null,
  type: null,
  personal: null
};
const onboardingReducer = createReducer(
  initialState,
  on(setOnboardingStepperAction, (state, action) => {
    return Object.assign({}, state, { stepper: action.step });
  }),
);
export function OnboardingReducer(state: OnboardingState, action: Action) {
  return onboardingReducer(state, action);
}