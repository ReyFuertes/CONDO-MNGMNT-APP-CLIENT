import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { RooState } from 'src/app/store/root.reducer';
import { GenericToastComponent } from 'src/app/shared/generics/generic-toast';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { DashboardOnboardingService } from '../../dashboard.service';
import { loadDashboardOnboardingAction, loadDashboardOnboardingActionSuccess } from '../actions/dashboard-onboarding.action';
import { IOnboadingResponseDto } from 'src/app/modules/on-boarding/on-boarding.model';

@Injectable()
export class DashboardOnboardingEffects extends GenericToastComponent {
  constructor(router: Router,
    private actions$: Actions,
    private dashboardOnboardingSrv: DashboardOnboardingService,
    private store: Store<RooState>,
    msgSrv: MessageService) {
    super(router, msgSrv);
  }

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
