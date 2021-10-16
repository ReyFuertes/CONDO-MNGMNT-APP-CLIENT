import { createAction, props } from '@ngrx/store';
import { IOnboadingResponseDto } from 'src/app/modules/on-boarding/on-boarding.model';

export enum DasboardHomeownersActionTypes {
  loadDashboardHomeownersAction = '[Homeowners] load homeowners',
  loadDashboardHomeownersActionSuccess = '[Homeowners] load homeowners success',
}
export const loadDashboardHomeownersAction = createAction(
  DasboardHomeownersActionTypes.loadDashboardHomeownersAction,
  props<{ keyword?: string }>()
);
export const loadDashboardHomeownersActionSuccess = createAction(
  DasboardHomeownersActionTypes.loadDashboardHomeownersActionSuccess,
  props<{ response: any }>()
);
