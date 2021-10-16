import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardModuleState } from '../reducers';

export const selectDashboardHomeownerModuleState = createFeatureSelector<DashboardModuleState>('dashboardModule');
export const getDashboardOnboardingSelector = createSelector(
  selectDashboardHomeownerModuleState,
  state => Object.values(state?.dashboardHomeowner?.entities) || []
);
