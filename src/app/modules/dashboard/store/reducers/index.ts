import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/root.reducer';
import { DashboardHomeownerReducer, DashboardHomeownerState } from './dashboard-homeowner.reducer';
import { DashboardOnboardingState, DashboardOnboardingReducer } from './dashboard-onboarding.reducer';
export interface DashboardModuleState {
  dashboardOnboarding: DashboardOnboardingState,
  dashboardHomeowner: DashboardHomeownerState
}

export const reducers: ActionReducerMap<DashboardModuleState> = {
  dashboardOnboarding: DashboardOnboardingReducer,
  dashboardHomeowner: DashboardHomeownerReducer
}

export interface RooState extends fromRoot.RooState {
  dashboardModule: DashboardModuleState;
}
