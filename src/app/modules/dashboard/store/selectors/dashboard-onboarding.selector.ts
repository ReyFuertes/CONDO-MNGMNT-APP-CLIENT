import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardModuleState } from '../reducers';

export const selectDashboardModuleState = createFeatureSelector<DashboardModuleState>('dashboardModule');
export const getDashboardOnboardingCountSelector = createSelector(
  selectDashboardModuleState,
  state => state?.dashboardOnboarding?.onBoardingCount || 0
);
export const getDashboardOnboardingSelector = createSelector(
  selectDashboardModuleState,
  state => {
    if (state?.dashboardOnboarding?.ids?.length === 0) return;
    return Object.values(state?.dashboardOnboarding?.entities)
  }
);
