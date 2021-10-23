import { createAction, props } from '@ngrx/store';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { IOnboardingOccupant, IOnboarding, IPersonal, IOnboardingSpouse, IOnboardingVehicle, IOnboardingDocument } from '../on-boarding.model';

export enum OnboardingActionTypes {
  setOnboardingStepperAction = '[Onboarding] set Stepper',
  addToOccupantAction = '[Onboarding] add occupant',
  removeOccupantAction = '[Onboarding] remove occupant',
  addDocumentsAction = '[Onboarding] add documents',
  createOnboardingAction = '[Onboarding] create onboarding',
  createOnboardingSuccessAction = '[Onboarding] create onboarding (success)',
  updateOnboardingAction = '[Onboarding] update onboarding',
  updateOnboardingSuccessAction = '[Onboarding] update onboarding (success)',
  clearStepperAction = "[Onboarding] clear onboarding stepper",
  addToPersonalAction = '[Onboarding] add to personal',
  addToSpouseAction = '[Onboarding] add to spouse',
  addToVehiclesAction = '[Onboarding] add to vehicle',
  addToOccupantsAction = '[Onboarding] add to occupant',
  addToTypeAction = '[Onboarding] add to type',
  saveAndUploadImageAction = '[Onboarding] save and upload image',
  saveAndUploadImageSuccessAction = '[Onboarding] save and upload image (success)',
  getOnboardingByIdAction = '[Onboarding] get onboarding',
  getOnboardingByIdSuccessAction = '[Onboarding] get onboarding (success)',
  updateOnboardingPersonalValuesAction = '[Onboarding] update onboarding personal values',
  updateOnboardingSpouseValuesAction = '[Onboarding] update onboarding spouse values',
  updateOnboardingOccupantValuesAction = '[Onboarding] update onboarding occupant values',
  updateOnboardingVehicleValuesAction = '[Onboarding] update onboarding vehicle values',
  updateOnboardingDocumentsValuesAction = '[Onboarding] update onboarding documents values'
}
export const updateOnboardingDocumentsValuesAction = createAction(
  OnboardingActionTypes.updateOnboardingDocumentsValuesAction,
  props<{ payload: IOnboardingDocument[] }>()
);
export const updateOnboardingVehicleValuesAction = createAction(
  OnboardingActionTypes.updateOnboardingVehicleValuesAction,
  props<{ payload: IOnboardingVehicle[] }>()
);
export const updateOnboardingSpouseValuesAction = createAction(
  OnboardingActionTypes.updateOnboardingSpouseValuesAction,
  props<{ payload: IOnboarding }>()
);
export const updateOnboardingOccupantValuesAction = createAction(
  OnboardingActionTypes.updateOnboardingOccupantValuesAction,
  props<{ payload: IOnboardingOccupant[] }>()
);
export const updateOnboardingPersonalValuesAction = createAction(
  OnboardingActionTypes.updateOnboardingPersonalValuesAction,
  props<{ payload: IOnboarding }>()
);
export const getOnboardingByIdAction = createAction(
  OnboardingActionTypes.getOnboardingByIdAction,
  props<{ id: string }>()
);
export const getOnboardingByIdSuccessAction = createAction(
  OnboardingActionTypes.getOnboardingByIdSuccessAction,
  props<{ response: IOnboarding }>()
);
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
  props<{ payload: IPersonal }>()
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
export const updateOnboardingAction = createAction(
  OnboardingActionTypes.updateOnboardingAction,
  props<{ payload: IOnboarding, files?: any, personalIdAttachment?: any, spouseIdAttachment?: any }>()
);
export const updateOnboardingSuccessAction = createAction(
  OnboardingActionTypes.updateOnboardingSuccessAction,
  props<{ response: IOnboarding }>()
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
  props<{ payload: IOnboardingDocument[] }>()
);
export const removeOccupantAction = createAction(
  OnboardingActionTypes.removeOccupantAction,
  props<{ item: IOnboardingOccupant }>()
);
export const setOnboardingStepperAction = createAction(
  OnboardingActionTypes.setOnboardingStepperAction,
  props<{ step: string }>()
);