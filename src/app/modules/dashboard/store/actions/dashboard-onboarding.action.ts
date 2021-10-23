import { createAction, props } from '@ngrx/store';
import { IOnboadingResponse, IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';

export enum DasboardOnboardingActionTypes {
  loadDashboardOnboardingAction = '[Onboarding] load onboarding',
  loadDashboardOnboardingActionSuccess = '[Onboarding] load onboarding (success)',
  approveDashboardOnboardingAction = '[Onboarding] approve onboarding',
  approveDashboardOnboardingActionSuccess = '[Onboarding] approve onboarding (success)',
  archiveDashboardOnboardingAction = '[Onboarding] archive onboarding',
  archiveDashboardOnboardingActionSuccess = '[Onboarding] archive onboarding (success)',
  deleteDashboardOnboardingAction = '[Onboarding] delete onboarding',
  deleteDashboardOnboardingActionSuccess = '[Onboarding] delete onboarding (success)',
}
export const deleteDashboardOnboardingAction = createAction(
  DasboardOnboardingActionTypes.deleteDashboardOnboardingAction,
  props<{ payload: IOnboarding }>()
);
export const deleteDashboardOnboardingActionSuccess = createAction(
  DasboardOnboardingActionTypes.deleteDashboardOnboardingActionSuccess,
  props<{ response: IOnboarding }>()
);
export const archiveDashboardOnboardingAction = createAction(
  DasboardOnboardingActionTypes.archiveDashboardOnboardingAction,
  props<{ payload: IOnboarding }>()
);
export const archiveDashboardOnboardingActionSuccess = createAction(
  DasboardOnboardingActionTypes.archiveDashboardOnboardingActionSuccess,
  props<{ response: IOnboarding }>()
);
export const approveDashboardOnboardingAction = createAction(
  DasboardOnboardingActionTypes.approveDashboardOnboardingAction,
  props<{ payload: IOnboarding }>()
);
export const approveDashboardOnboardingActionSuccess = createAction(
  DasboardOnboardingActionTypes.approveDashboardOnboardingActionSuccess,
  props<{ response: IOnboarding }>()
);
export const loadDashboardOnboardingAction = createAction(
  DasboardOnboardingActionTypes.loadDashboardOnboardingAction,
  props<{ keyword?: string }>()
);
export const loadDashboardOnboardingActionSuccess = createAction(
  DasboardOnboardingActionTypes.loadDashboardOnboardingActionSuccess,
  props<{ response: IOnboadingResponse }>()
);
