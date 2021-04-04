import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { BUILDINGNOOPTIONS, CIVILOPTIONS, GENDEROPTIONS, IDTYPEOPTIONS, PARTKINGNOOPTIONS, RELATIONSOPTIONS, UNITNOOPTIONS } from '../constants/generic';
import { GenericDestroyPageComponent } from './generic-destroy';
@Directive()
export class GenericOnBoardingComponent extends GenericDestroyPageComponent {
  public buildingNoOptions = BUILDINGNOOPTIONS;
  public unitNoOptions = UNITNOOPTIONS;
  public parkingNoOptions = PARTKINGNOOPTIONS;
  public genderOptions = GENDEROPTIONS;
  public civilOptions = CIVILOPTIONS;
  public IdTypeOptions = IDTYPEOPTIONS;
  public relationOptions = RELATIONSOPTIONS;

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
