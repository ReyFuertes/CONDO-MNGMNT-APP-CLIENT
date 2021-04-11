import { createAction, props } from '@ngrx/store';
import { IOccupant, IOnboarding } from '../on-boarding.model';

export enum OnboardingActionTypes {
  setOnboardingStepperAction = '[Onboarding] set Stepper',
  addOccupantAction = '[Onboarding] add occupant',
  removeOccupantAction = '[Onboarding] remove occupant',
  addDocumentsAction = '[Onboarding] add documents',
  createOnboardingAction = '[Onboarding] create onboarding',
  createOnboardingSuccessAction = '[Onboarding] create onboarding (success)',
}
export const createOnboardingAction = createAction(
  OnboardingActionTypes.createOnboardingAction,
  props<{ payload: IOnboarding }>()
);
export const createOnboardingSuccessAction = createAction(
  OnboardingActionTypes.createOnboardingSuccessAction,
  props<{ response: IOnboarding }>()
);
export const addDocumentsAction = createAction(
  OnboardingActionTypes.addDocumentsAction,
  props<{ documents: any }>()
);
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