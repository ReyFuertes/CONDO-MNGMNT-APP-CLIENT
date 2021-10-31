import { createReducer, on, Action } from "@ngrx/store";
import * as _ from 'lodash';
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { loadDashboardHomeownersActionSuccess, getHomeownerOccupantsActionSuccess, loadHomeownerVehiclesActionSuccess } from "../actions/dashboard-homeowners.action";
import { IHomeowner, IOccupant, IVehicle } from "src/app/models/homeowners.model";

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({});
export interface DashboardHomeownerState extends EntityState<IHomeowner> {
  occupants?: IOccupant[];
  vehicles?: IVehicle[]
}

export const initialState: DashboardHomeownerState = adapter.getInitialState({
  occupants: null,
  vehicles: null,
});

const dashboardHomeownerReducer = createReducer(
  initialState,
  on(loadHomeownerVehiclesActionSuccess, (state, action) => {
    return Object.assign({}, state, { vehicles: action.response })
  }),
  on(getHomeownerOccupantsActionSuccess, (state, action) => {
    let entities = Object.assign([], state.entities[action?.response.homeowner?.id]);
    let entity = Object.assign({}, entities, {
      occupants: {
        count: action?.response?.count,
        data: action?.response?.data
      }
    })
    return adapter.updateOne({ id: entity.id, changes: entity }, state);
  }),
  on(loadDashboardHomeownersActionSuccess, (state, action) => {
    return adapter.setAll(action?.response, state);
  }),
);
export function DashboardHomeownerReducer(state: DashboardHomeownerState, action: Action) {
  return dashboardHomeownerReducer(state, action);
}