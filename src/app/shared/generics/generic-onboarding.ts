import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setOnboardingStepperAction } from 'src/app/modules/on-boarding/store/onboarding.action';
import { StorageService } from 'src/app/services/storage.service';
import { AppState } from 'src/app/store/app.reducer';
import { GenericDestroyPageComponent } from './generic-destroy';
@Directive()
export class GenericOnBoardingComponent extends GenericDestroyPageComponent {
  public _step: string;
  constructor(step: string, private storageSrv: StorageService, private router: Router) {
    super();
    this._step = step;
    console.log(step)
  }

  public onNext(route?: string): void {
    this.storageSrv.set('step', this._step);
    this.router.navigateByUrl(route);
  }

  public onPrev(route?: string): void {
    this.storageSrv.set('step', this._step);
    this.router.navigateByUrl(route);
  }
}
