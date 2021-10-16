import { createReducer, on, Action } from "@ngrx/store";
import * as _ from 'lodash';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { IOnboarding } from "src/app/modules/on-boarding/on-boarding.model";
import { approveDashboardOnboardingActionSuccess, archiveDashboardOnboardingActionSuccess, deleteDashboardOnboardingActionSuccess, loadDashboardOnboardingActionSuccess } from "../actions/dashboard-onboarding.action";

export const adapter: EntityAdapter<IOnboarding> = createEntityAdapter<IOnboarding>({});
export interface DashboardOnboardingState extends EntityState<IOnboarding> {
  onBoardingCount?: number
}

export const initialState: DashboardOnboardingState = adapter.getInitialState({
  onBoardingCount: null
});

const dashboardOnboardingReducer = createReducer(
  initialState,
  on(deleteDashboardOnboardingActionSuccess, (state, action) => {
    return adapter.removeOne(action?.response?.id, state);
  }),
  on(archiveDashboardOnboardingActionSuccess, (state, action) => {
    return adapter.removeOne(action?.response?.id, state);
  }),
  on(approveDashboardOnboardingActionSuccess, (state, action) => {
    return adapter.removeOne(action?.response?.id, state);
  }),
  on(loadDashboardOnboardingActionSuccess, (state, action) => {
    return adapter.setAll(action?.response?.data, state);
  }),
  on(loadDashboardOnboardingActionSuccess, (state, action) => {
    return Object.assign({}, state, { onBoardingCount: action?.response?.count });
  }),
);
export function DashboardOnboardingReducer(state: DashboardOnboardingState, action: Action) {
  return dashboardOnboardingReducer(state, action);
}