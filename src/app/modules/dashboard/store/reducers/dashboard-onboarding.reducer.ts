import { createReducer, on, Action } from "@ngrx/store";
import * as _ from 'lodash';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { IOnboarding } from "src/app/modules/on-boarding/on-boarding.model";
import { loadDashboardOnboardingActionSuccess } from "../actions/dashboard-onboarding.action";

export const adapter: EntityAdapter<IOnboarding> = createEntityAdapter<IOnboarding>({});
export interface DashboardOnboardingState extends EntityState<IOnboarding> {}

export const initialState: DashboardOnboardingState = adapter.getInitialState({});

const dashboardOnboardingReducer = createReducer(
  initialState,
  on(loadDashboardOnboardingActionSuccess, (state, action) => {
    return adapter.setAll(action.response, state);
  }),
);
export function DashboardOnboardingReducer(state: DashboardOnboardingState, action: Action) {
  return dashboardOnboardingReducer(state, action);
}