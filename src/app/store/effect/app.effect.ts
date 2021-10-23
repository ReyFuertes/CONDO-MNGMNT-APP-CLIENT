import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getBuildingsAction, getBuildingsSuccessAction } from './app.action';
import { IPersonal } from '../modules/on-boarding/on-boarding.model';
import { map, switchMap } from 'rxjs/operators';
import { OnboardingService } from '../modules/on-boarding/on-boarding.service';

@Injectable()
export class AppEffects {
  getBuildingsAction$ = createEffect(() => this.actions$.pipe(
    ofType(getBuildingsAction),
    switchMap(() => this.onBoardingSrv.getAll().pipe(
      map((response: IPersonal[]) => {
        return getBuildingsSuccessAction({ response });
      })
    ))
  ));
  
  constructor(
    private actions$: Actions,
    private onBoardingSrv: OnboardingService
    ) { }
}
