import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { RooState } from 'src/app/store/root.reducer';
import { GenericNotificationComponent } from 'src/app/shared/generics/generic-toast';
import { Router } from '@angular/router';
import { DashboardHomeownersService } from '../../dashboard.service';
import { loadDashboardHomeownersAction, loadDashboardHomeownersActionSuccess } from '../actions/dashboard-homeowners.action';

@Injectable()
export class DashboardHomeownersEffects extends GenericNotificationComponent {
  constructor(router: Router,
    private actions$: Actions,
    private dashboardHomeownersSrv: DashboardHomeownersService,
    private store: Store<RooState>,
    msgSrv: MessageService) {
    super(router, msgSrv);
  }

  loadDashboardHomeownersAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadDashboardHomeownersAction),
    switchMap(({ keyword }) => {
      return this.dashboardHomeownersSrv.getAll(keyword || '').pipe(
        map((response) => {
          return loadDashboardHomeownersActionSuccess({ response });
        })
      )
    })
  ));
}
