import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';


@Injectable()
export class OnboardingEffects {
  constructor(private actions$: Actions) { }
}
