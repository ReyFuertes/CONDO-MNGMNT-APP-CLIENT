import { createAction, props } from '@ngrx/store';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { IOnboardingOccupant, IOnboarding, IOnboardingPersonal, IOnboardingSpouse, IOnboardingVehicle, IOnboardingDocument } from '../on-boarding.model';

export enum OnboardingActionTypes {
  setOnboardingStepperAction = '[Onboarding] set Stepper',
  addToOccupantAction = '[Onboarding] add occupant',
  removeOccupantAction = '[Onboarding] remove occupant',
  addDocumentsAction = '[Onboarding] add documents',
  createOnboardingAction = '[Onboarding] create onboarding',
  createOnboardingSuccessAction = '[Onboarding] create onboarding (success)',
  clearStepperAction = "[Onboarding] clear onboarding stepper",
  addToPersonalAction = '[Onboarding] add to personal',
  addToSpouseAction = '[Onboarding] add to spouse',
  addToVehiclesAction = '[Onboarding] add to vehicle',
  addToOccupantsAction = '[Onboarding] add to occupant',
  addToTypeAction = '[Onboarding] add to type',
  saveAndUploadImageAction = '[Onboarding] save and upload image',
  saveAndUploadImageSuccessAction = '[Onboarding] save and upload image (success)',
}
export const saveAndUploadImageAction = createAction(
  OnboardingActionTypes.saveAndUploadImageAction,
  props<{ payload: any, images?: any }>()
);
export const saveAndUploadImageSuccessAction = createAction(
  OnboardingActionTypes.saveAndUploadImageSuccessAction,
  props<{ response: any }>()
);
export const addToSpouseAction = createAction(
  OnboardingActionTypes.addToSpouseAction,
  props<{ payload: IOnboardingSpouse }>()
);
export const addToTypeAction = createAction(
  OnboardingActionTypes.addToTypeAction,
  props<{ payload: OnBoardingType }>()
);
export const addToPersonalAction = createAction(
  OnboardingActionTypes.addToPersonalAction,
  props<{ payload: IOnboardingPersonal }>()
);
export const addToOccupantAction = createAction(
  OnboardingActionTypes.addToOccupantAction,
  props<{ response: IOnboardingOccupant }>()
);
export const addToOccupantsAction = createAction(
  OnboardingActionTypes.addToOccupantsAction,
  props<{ payload: IOnboardingOccupant[] }>()
);
export const addToVehiclesAction = createAction(
  OnboardingActionTypes.addToVehiclesAction,
  props<{ payload: IOnboardingVehicle[] }>()
);
export const clearStepperAction = createAction(
  OnboardingActionTypes.clearStepperAction
);
export const createOnboardingAction = createAction(
  OnboardingActionTypes.createOnboardingAction,
  props<{ payload: IOnboarding, files?: any, personalIdAttachment?: any, spouseIdAttachment?: any }>()
);
export const createOnboardingSuccessAction = createAction(
  OnboardingActionTypes.createOnboardingSuccessAction,
  props<{ response: IOnboarding }>()
);
export const addDocumentsAction = createAction(
  OnboardingActionTypes.addDocumentsAction,
  props<{ documents: IOnboardingDocument[] }>()
);
export const removeOccupantAction = createAction(
  OnboardingActionTypes.removeOccupantAction,
  props<{ item: IOnboardingOccupant }>()
);
export const setOnboardingStepperAction = createAction(
  OnboardingActionTypes.setOnboardingStepperAction,
  props<{ step: string }>()
);