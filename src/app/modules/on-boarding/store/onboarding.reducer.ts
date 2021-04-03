import { createReducer, on, Action } from "@ngrx/store";
import { setOnboardingStepperAction } from "./onboarding.action";

export interface OnboardingState {
  stepper?: string
}
export const initialState: OnboardingState = {
  stepper: null,
};
const onboardingReducer = createReducer(
  initialState,
  on(setOnboardingStepperAction, (state, action) => {
    debugger
    return Object.assign({}, state, { stepper: action.step });
  }),
);
export function OnboardingReducer(state: OnboardingState, action: Action) {
  return onboardingReducer(state, action);
}