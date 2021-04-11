import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createOnboardingAction, createOnboardingSuccessAction } from './onboarding.action';
import { IOnboarding } from '../on-boarding.model';
import { OnboardingService } from '../on-boarding.service';
import { map, switchMap } from 'rxjs/operators';
@Injectable()
export class OnboardingEffects {
  constructor(private actions$: Actions, private onBoardingSrv: OnboardingService) { }

  createOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(createOnboardingAction),
    switchMap(({ payload }) => this.onBoardingSrv.post(payload).pipe(
      map((response: IOnboarding) => {
        return createOnboardingSuccessAction({ response });
      })
    ))
  ));
}
