import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
  setOnboardingStepperAction = '[Onboarding] set Stepper',
}
export const setOnboardingStepperAction = createAction(
  AppActionTypes.setOnboardingStepperAction,
  props<{ step: string }>()
);