import { createAction, props } from '@ngrx/store';
import { IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';

export enum DasboardOnboardingActionTypes {
  loadDashboardOnboardingAction = '[Onboarding] load onboarding',
  loadDashboardOnboardingActionSuccess = '[Onboarding] load onboarding success'
}
export const loadDashboardOnboardingAction = createAction(
  DasboardOnboardingActionTypes.loadDashboardOnboardingAction
);
export const loadDashboardOnboardingActionSuccess = createAction(
  DasboardOnboardingActionTypes.loadDashboardOnboardingActionSuccess,
  props<{ response: IOnboarding[] }>()
);
