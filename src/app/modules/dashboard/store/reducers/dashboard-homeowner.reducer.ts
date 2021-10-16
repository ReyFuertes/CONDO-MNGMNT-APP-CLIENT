import { createReducer, on, Action } from "@ngrx/store";
import * as _ from 'lodash';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { loadDashboardHomeownersActionSuccess } from "../actions/dashboard-homeowners.action";

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({});
export interface DashboardHomeownerState extends EntityState<any> {
  
}

export const initialState: DashboardHomeownerState = adapter.getInitialState({
 
});

const dashboardHomeownerReducer = createReducer(
  initialState,
  on(loadDashboardHomeownersActionSuccess, (state, action) => {
    return adapter.setAll(action?.response, state);
  }),
);
export function DashboardHomeownerReducer(state: DashboardHomeownerState, action: Action) {
  return dashboardHomeownerReducer(state, action);
}