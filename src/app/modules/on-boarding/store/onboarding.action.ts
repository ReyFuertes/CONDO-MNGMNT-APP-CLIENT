import { createAction, props } from '@ngrx/store';
import { IOccupant } from '../on-boarding.model';

export enum OnboardingActionTypes {
  setOnboardingStepperAction = '[Onboarding] set Stepper',
  addOccupantAction = '[Onboarding] add occupant',
  removeOccupantAction = '[Onboarding] remove occupant',
}
export const removeOccupantAction = createAction(
  OnboardingActionTypes.removeOccupantAction,
  props<{ item: IOccupant }>()
);
export const addOccupantAction = createAction(
  OnboardingActionTypes.addOccupantAction,
  props<{ response: IOccupant }>()
);
export const setOnboardingStepperAction = createAction(
  OnboardingActionTypes.setOnboardingStepperAction,
  props<{ step: string }>()
);