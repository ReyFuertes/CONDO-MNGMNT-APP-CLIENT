import { AfterViewInit, ChangeDetectorRef, Directive } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IOccupant } from 'src/app/modules/on-boarding/on-boarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { BUILDINGNOOPTIONS, CIVILOPTIONS, GENDEROPTIONS, IDTYPEOPTIONS, PARTKINGNOOPTIONS, RELATIONSOPTIONS, UNITNOOPTIONS } from '../constants/generic';
import { GenericDestroyPageComponent } from './generic-destroy';
import { OnboardingEntityType } from './generic-model';
import * as moment from 'moment';

@Directive()
export class GenericOnBoardingComponent extends GenericDestroyPageComponent implements AfterViewInit {
  public form: FormGroup;
  public buildingNoOptions = BUILDINGNOOPTIONS;
  public unitNoOptions = UNITNOOPTIONS;
  public parkingNoOptions = PARTKINGNOOPTIONS;
  public genderOptions = GENDEROPTIONS;
  public civilOptions = CIVILOPTIONS;
  public IdTypeOptions = IDTYPEOPTIONS;
  public relationOptions = RELATIONSOPTIONS;
  public _step: string;
  public FormOccupantsArr: FormArray;

  constructor(step: string, private storageSrv: StorageService, private router: Router, private cdRef: ChangeDetectorRef,
    private fb: FormBuilder) {
    super();
    this._step = step;
  }

  ngAfterViewInit(): void {
    switch (this._step) {
      case OnboardingEntityType.ONBOARDINGPERSONAL:
        const strPersonal = this.storageSrv.get('personal');
        if (strPersonal) {
          let personal = JSON.parse(strPersonal);
          personal = {
            ...personal,
            dateOfBirth: new Date(personal?.dateOfBirth)
          }
          this.form.patchValue(personal);
        }
        break;
      case OnboardingEntityType.ONBOARDINGPARTNER:
        const strPartner = this.storageSrv.get('partner');
        if (strPartner) {
          let partner = JSON.parse(strPartner);
          partner = {
            ...partner,
            dateOfBirth: new Date(partner?.dateOfBirth)
          }
          this.form.patchValue(partner);
        }
        break;
      case OnboardingEntityType.ONBOARDINGOCCUPANTS:
        const occupants = this.storageSrv.get('occupants');
        if (occupants) {
          const occupantsArr = JSON.parse(occupants)?.occupants;
          this.FormOccupantsArr = this.form.get('occupants') as FormArray;

          occupantsArr.forEach(occupant => {
            this.FormOccupantsArr.push(this.createItem(Object.assign({}, occupant)));
          });
        }
        break;
      case OnboardingEntityType.ONBOARDINGDOCUMENTS:
        //we are using state to get the documents since localstorage cannot handle file set
        break;
      case OnboardingEntityType.ONBOARDINGREVIEW:
        break;
    }
    this.cdRef.detectChanges();
  }

  protected createItem = (item: IOccupant): FormGroup => this.fb.group(item);

  public onNext(route?: string, formName?: string, formValues?: any): void {
    if (formName && formValues) {
      this.storageSrv.set(formName, JSON.stringify(formValues));
    }
    this.storageSrv.set('step', String(Number(this._step) + 1));
    this.router.navigateByUrl(route);
  }

  public onPrev(route?: string, formName?: string, formValues?: any): void {
    if (formName && formValues) {
      this.storageSrv.set(formName, JSON.stringify(formValues));
    }
    this.storageSrv.set('step', String(Number(this._step) - 1));
    this.router.navigateByUrl(route);
  }
}
