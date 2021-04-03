import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { GenericDestroyPageComponent } from './generic-destroy';
@Directive()
export class GenericOnBoardingComponent extends GenericDestroyPageComponent {
  public _step: string;
  constructor(step: string, private storageSrv: StorageService, private router: Router) {
    super();
    this._step = String(Number(step) + 1);
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
