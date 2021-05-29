import { AfterViewInit, ChangeDetectorRef, Directive } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { IOnboardingDocument, IOnboardingOccupant, IOnboardingVehicle } from 'src/app/modules/on-boarding/on-boarding.model';
import { getOnboardingSelector } from 'src/app/modules/on-boarding/store/onboarding.selector';
import { StorageService } from 'src/app/services/storage.service';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { BUILDINGNOOPTIONS, CIVILOPTIONS, GENDEROPTIONS, IDTYPEOPTIONS, PARTKINGNOOPTIONS, RELATIONSOPTIONS, STRDOCUMENTS, STROCCUPANTS, STRPERSONAL, STRSPOUSE, STRVEHICLES, UNITNOOPTIONS, STRTYPE } from '../constants/generic';
import { GenericDestroyPageComponent } from './generic-destroy';
import { OnboardingEntityType } from './generic-model';

@Directive()
export class GenericOnBoardingComponent extends GenericDestroyPageComponent implements AfterViewInit {
  public id: string = '12524b05-d8a2-4b1c-9c1f-79c321aa64d4';
  public _step: string;
  public form: FormGroup;
  public buildingNoOptions = BUILDINGNOOPTIONS;
  public unitNoOptions = UNITNOOPTIONS;
  public parkingNoOptions = PARTKINGNOOPTIONS;
  public genderOptions = GENDEROPTIONS;
  public civilOptions = CIVILOPTIONS;
  public IdTypeOptions = IDTYPEOPTIONS;
  public relationOptions = RELATIONSOPTIONS;
  public FormOccupantsArr: FormArray;
  public FormVehiclesArr: FormArray;
  public svgPath: string = environment.svgPath;
  public uploadedDocs: any[] = [];

  constructor(step: string, private storageSrv: StorageService, private router: Router, private cdRef: ChangeDetectorRef,
    private fb: FormBuilder, private store: Store<RooState>) {
    super();
    this._step = step;
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getOnboardingSelector), takeUntil(this.$unsubscribe))
      .subscribe(res => {
        const { type, personal, spouse, occupants, vehicles, documents } = res;

        switch (this._step) {
          case OnboardingEntityType.ONBOARDINGTYPE:
            if (type) this.form.get(STRTYPE).patchValue(type);
            else {
              const strType = this.storageSrv.get(STRTYPE);
              if (strType) {
                let t = JSON.parse(strType);
                this.form.get(STRTYPE).patchValue(t);
              }
            }
            break;
          case OnboardingEntityType.ONBOARDINGPERSONAL:
            if (personal) this.form.patchValue(personal);
            else {
              const strPersonal = this.storageSrv.get(STRPERSONAL);  /* get personal data in localstorage */
              if (strPersonal) {
                let p = JSON.parse(strPersonal);
                this.form.patchValue({ ...p, dateOfBirth: p?.dateOfBirth ? new Date(p?.dateOfBirth) : null });
              }
            }
            break;
          case OnboardingEntityType.ONBOARDINGSPOUSE:
            if (spouse) this.form.patchValue(spouse);
            else {
              const strSpouse = this.storageSrv.get(STRSPOUSE);  /* get spouse data in localstorage */
              if (strSpouse) {
                let s = JSON.parse(strSpouse);
                s = { ...s, dateOfBirth: s?.dateOfBirth ? new Date(s?.dateOfBirth) : null }
                this.form.patchValue(s);
              }
            }
            break;
          case OnboardingEntityType.ONBOARDINGOCCUPANTS:
            if (occupants) {
              occupants?.forEach(occupant => {
                this.FormOccupantsArr = this.form.get(STROCCUPANTS) as FormArray;
                this.FormOccupantsArr.push(this.createOccupantItem(Object.assign({}, occupant)));
              });
            } else {
              const o = this.storageSrv.get(STROCCUPANTS);
              if (o) {
                const occupantsArr = JSON.parse(o)?.occupants;
                this.FormOccupantsArr = this.form.get(STROCCUPANTS) as FormArray;

                occupantsArr?.forEach(occupant => {
                  this.FormOccupantsArr.push(this.createOccupantItem(Object.assign({}, occupant)));
                });
              }
            }
            break;
          case OnboardingEntityType.ONBOARDINGVEHICLES:
            if (vehicles) {
              vehicles?.forEach(vehicle => {
                this.FormVehiclesArr = this.form.get(STRVEHICLES) as FormArray;
                this.FormVehiclesArr.push(this.createVehicleItem(Object.assign({}, vehicle)));
              });
            } else {
              const vehicles = this.storageSrv.get(STRVEHICLES);
              if (vehicles) {
                const vehiclesArr = JSON.parse(vehicles)?.vehicles;
                this.FormVehiclesArr = this.form.get(STRVEHICLES) as FormArray;

                vehiclesArr?.forEach(vehicle => {
                  this.FormVehiclesArr.push(this.createVehicleItem(Object.assign({}, vehicle)));
                });
              }
            }
            break;
          case OnboardingEntityType.ONBOARDINGDOCUMENTS:
            if (documents) {
              this.uploadedDocs = documents;
            };
            break;
          case OnboardingEntityType.ONBOARDINGREVIEW:
            break;
        }
      });
    this.cdRef.detectChanges();
  }

  protected createVehicleItem = (item: IOnboardingVehicle): FormGroup => {
    return this.fb.group(item);
  };

  protected createOccupantItem = (item: IOnboardingOccupant): FormGroup => {
    return this.fb.group(item);
  };

  protected createDocumentItem = (item: IOnboardingDocument): FormGroup => {
    return this.fb.group(item);
  };

  public onNext(route?: string, formName?: string, formValues?: any): void {
    if (formName && formValues) {
      this.storageSrv.set(formName, JSON.stringify(formValues));
    }
    this.storageSrv.set('step', String(Number(this._step) + 1));
    this.router.navigateByUrl(`${route}/${this.id}`);
  }

  public onPrev(route?: string, formName?: string, formValues?: any): void {
    if (formName && formValues) {
      this.storageSrv.set(formName, JSON.stringify(formValues));
    }
    this.storageSrv.set('step', String(Number(this._step) - 1));
    this.router.navigateByUrl(`${route}/${this.id}`);
  }
}
