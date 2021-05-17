import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardModuleState } from '../reducers';

export const selectDashboardModuleState = createFeatureSelector<DashboardModuleState>('dashboardModule');
export const getDashboardOnboardingSelector = createSelector(
  selectDashboardModuleState,
  state => {
    return Object.values(state?.dashboardOnboarding?.entities) || [];
  }
);
