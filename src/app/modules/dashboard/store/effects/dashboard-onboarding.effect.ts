import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { RooState } from 'src/app/store/root.reducer';
import { GenericToastComponent } from 'src/app/shared/generics/generic-toast';
import { Router } from '@angular/router';
import { DashboardOnboardingService } from '../../dashboard.service';
import { approveDashboardOnboardingAction, approveDashboardOnboardingActionSuccess, archiveDashboardOnboardingAction, archiveDashboardOnboardingActionSuccess, deleteDashboardOnboardingAction, deleteDashboardOnboardingActionSuccess, loadDashboardOnboardingAction, loadDashboardOnboardingActionSuccess } from '../actions/dashboard-onboarding.action';
import { IOnboadingResponseDto, IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';
import { appNotificationAction } from 'src/app/store/action/notification.action';
import { of } from 'rxjs';

@Injectable()
export class DashboardOnboardingEffects extends GenericToastComponent {
  constructor(router: Router,
    private actions$: Actions,
    private dashboardOnboardingSrv: DashboardOnboardingService,
    private store: Store<RooState>,
    msgSrv: MessageService) {
    super(router, msgSrv);
  }
  
  deleteDashboardOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteDashboardOnboardingAction),
    switchMap(({ payload }) => {
      return this.dashboardOnboardingSrv.post(payload, 'ondelete').pipe(
        map((response) => {
          return deleteDashboardOnboardingActionSuccess({ response: <IOnboarding>response });
        })
      )
    })
  ));

  archiveDashboardOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(archiveDashboardOnboardingAction),
    switchMap(({ payload }) => {
      return this.dashboardOnboardingSrv.post(payload, 'onarchive').pipe(
        map((response) => {
          return archiveDashboardOnboardingActionSuccess({ response: <IOnboarding>response });
        })
      )
    })
  ));

  approveDashboardOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(approveDashboardOnboardingAction),
    switchMap(({ payload }) => {
      return this.dashboardOnboardingSrv.post(payload, 'onboard').pipe(
        map((response) => {
          this.store.dispatch(appNotificationAction({
            notification: { success: true, message: `${payload?.personal?.firstname} ${payload?.personal?.lastname} successfully added to homeowners` }
          }));
          return approveDashboardOnboardingActionSuccess({ response: <IOnboarding>response });
        }),
        catchError(() => {
          return of(appNotificationAction({
            notification: { error: true, message: `Failed to add ${payload?.personal?.firstname} ${payload?.personal?.lastname} as homeowner.` }
          }));
        })
      )
    })
  ));

  getOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadDashboardOnboardingAction),
    switchMap(({ keyword }) => {
      return this.dashboardOnboardingSrv.getAll(keyword || '').pipe(
        map((response) => {
          return loadDashboardOnboardingActionSuccess({ response: <IOnboadingResponseDto>response });
        })
      )
    })
  ));
}
