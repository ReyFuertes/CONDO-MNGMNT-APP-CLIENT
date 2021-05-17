import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/root.reducer';
import { DashboardOnboardingState, DashboardOnboardingReducer } from './dashboard-onboarding.reducer';

export interface DashboardModuleState {
  dashboardOnboarding: DashboardOnboardingState,
}

export const reducers: ActionReducerMap<DashboardModuleState> = {
  dashboardOnboarding: DashboardOnboardingReducer,
}

export interface RooState extends fromRoot.RooState {
  dashboardModule: DashboardModuleState;
}
