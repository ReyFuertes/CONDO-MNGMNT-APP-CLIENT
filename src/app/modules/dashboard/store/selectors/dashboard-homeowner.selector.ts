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
  state => Object.values(state?.dashboardHomeowner?.entities)
);
export const getDashboardHomeownersByIdSelector = (id: string) => createSelector(
  selectDashboardHomeownerModuleState,
  state => state?.dashboardHomeowner?.entities[id]
);
