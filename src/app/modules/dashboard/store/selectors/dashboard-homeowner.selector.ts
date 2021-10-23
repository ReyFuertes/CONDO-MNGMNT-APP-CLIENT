import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardModuleState } from '../reducers';

export const selectDashboardHomeownerModuleState = createFeatureSelector<DashboardModuleState>('dashboardModule');
export const getDashboardVehicleOccupantsSelector = createSelector(
  selectDashboardHomeownerModuleState,
  state => state?.dashboardHomeowner?.vehicles
);
export const getDashboardHomeownerOccupantsSelector = createSelector(
  selectDashboardHomeownerModuleState,
  state => state?.dashboardHomeowner?.occupants
);
export const getDashboardHomeownersSelector = createSelector(
  selectDashboardHomeownerModuleState,
  state => state?.dashboardHomeowner?.ids?.length > 0 ? Object.values(state?.dashboardHomeowner?.entities) : null
);
