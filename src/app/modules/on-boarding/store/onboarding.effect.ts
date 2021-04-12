import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createOnboardingAction, createOnboardingSuccessAction } from './onboarding.action';
import { OnboardingService } from '../on-boarding.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { RooState } from 'src/app/store/root.reducer';
import { isLoadingSelector } from 'src/app/store/selector/app.selector';
import { GenericToastComponent } from 'src/app/shared/generics/generic-toast';
@Injectable()
export class OnboardingEffects extends GenericToastComponent {
  constructor(private actions$: Actions, private store: Store<RooState>, private onBoardingSrv: OnboardingService, msgSrv: MessageService) {
    super(msgSrv);
  }

  createOnboardingAction$ = createEffect(() => this.actions$.pipe(
    ofType(createOnboardingAction),
    switchMap(({ payload }) => combineLatest([
      this.onBoardingSrv.post(payload),
      this.store.pipe(select(isLoadingSelector))
    ]).pipe(
      map(([response, loader]) => {
        if (loader === null) {
          this.triggerSaveToast();
        }
        return createOnboardingSuccessAction({ response });
      })
    ))
  ));
}
