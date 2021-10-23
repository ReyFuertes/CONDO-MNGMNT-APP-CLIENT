import { createAction, props } from '@ngrx/store';
import { IOnboadingResponse } from 'src/app/modules/on-boarding/on-boarding.model';

export enum DasboardHomeownersActionTypes {
  loadDashboardHomeownersAction = '[Homeowners] load homeowners',
  loadDashboardHomeownersActionSuccess = '[Homeowners] load homeowners (success)',
  loadHomeownerOccupantsAction = '[Homeowners] load homeowner occupants',
  loadHomeownerOccupantsActionSuccess = '[Homeowners] load homeowner occupants (success)',
  loadHomeownerVehiclesAction = '[Homeowners] load homeowner vehicles',
  loadHomeownerVehiclesActionSuccess = '[Homeowners] load homeowner vehicles (success)',
}
export const loadHomeownerVehiclesAction = createAction(
  DasboardHomeownersActionTypes.loadHomeownerVehiclesAction,
  props<{ keyword?: string }>()
);
export const loadHomeownerVehiclesActionSuccess = createAction(
  DasboardHomeownersActionTypes.loadHomeownerVehiclesActionSuccess,
  props<{ response: any }>()
);
export const loadHomeownerOccupantsAction = createAction(
  DasboardHomeownersActionTypes.loadHomeownerOccupantsAction,
  props<{ keyword?: string }>()
);
export const loadHomeownerOccupantsActionSuccess = createAction(
  DasboardHomeownersActionTypes.loadHomeownerOccupantsActionSuccess,
  props<{ response: any }>()
);
export const loadDashboardHomeownersAction = createAction(
  DasboardHomeownersActionTypes.loadDashboardHomeownersAction,
  props<{ keyword?: string }>()
);
export const loadDashboardHomeownersActionSuccess = createAction(
  DasboardHomeownersActionTypes.loadDashboardHomeownersActionSuccess,
  props<{ response: any }>()
);
