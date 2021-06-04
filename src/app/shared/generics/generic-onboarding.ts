import { AfterViewInit, ChangeDetectorRef, Directive } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
import { IOnboarding, IOnboardingDocument, IOnboardingOccupant, IOnboardingVehicle } from 'src/app/modules/on-boarding/on-boarding.model';
import { getOnboardingByIdAction } from 'src/app/modules/on-boarding/store/onboarding.action';
import { getOnboardingSelector, onboardingLoadedSelector } from 'src/app/modules/on-boarding/store/onboarding.selector';
import { StorageService } from 'src/app/services/storage.service';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { BUILDINGNOOPTIONS, CIVILOPTIONS, GENDEROPTIONS, IDTYPEOPTIONS, PARTKINGNOOPTIONS, RELATIONSOPTIONS, STRDOCUMENTS, STROCCUPANTS, STRPERSONAL, STRSPOUSE, STRVEHICLES, UNITNOOPTIONS, STRTYPE } from '../constants/generic';
import { FmtPayloadToForm } from '../util/formating';
import { GenericDestroyPageComponent } from './generic-destroy';
import { OnboardingEntityType } from './generic-model';

@Directive()
export class GenericOnBoardingComponent extends GenericDestroyPageComponent implements AfterViewInit {
  public id: string;
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
  public formDocumentsArr: FormArray;
  public svgPath: string = environment.svgPath;
  public toUploadDocs: any[] = [];
  public onboardingLoaded: boolean = false;

  constructor(step: string, private storageSrv: StorageService, private router: Router, private cdRef: ChangeDetectorRef,
    private fb: FormBuilder, private store: Store<RooState>) {
    super();
    this._step = step;

    this.form = this.fb.group({
      type: [null],
      personal: this.fb.group({
        id: [null],
        buildingNo: [null],
        unitNo: [null],
        parkingSlot: [null],
        occupantType: [null],
        lastname: [null],
        firstname: [null],
        middlename: [null],
        citizenship: [null],
        gender: [null],
        civilStatus: [null],
        dateOfBirth: [null],
        occupation: [null],
        busAddress: [null],
        busContactNo: [null],
        busEmail: [null],
        tin: [null],
        idType: [null],
        idNo: [null],
        uploadPersonalIdFile: [null],
        getPersonalUploadedFilePreview: [null]
      }),
      spouse: this.fb.group({
        id: [null],
        lastname: [null],
        firstname: [null],
        middlename: [null],
        citizenship: [null],
        gender: [null],
        civilStatus: [null],
        dateOfBirth: [null],
        occupation: [null],
        busAddress: [null],
        busContactNo: [null],
        busEmail: [null],
        tin: [null],
        idType: [null],
        idNo: [null],
        uploadSpouseIdFile: [null],
        uploadSpouseIdFilePreview: [null]
      }),
      occupants: new FormArray([]),
      vehicles: new FormArray([]),
      documents: new FormArray([])
    });

    this.store.pipe(select(onboardingLoadedSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        this.onboardingLoaded = res;
      });
  }

  ngAfterViewInit(): void {
    const id = this.storageSrv.get('obId');
    if (id) {
      this.id = JSON.parse(id);

      //if the onboarding is not loaded yet, then load it
      if (!this.onboardingLoaded) {
        this.store.dispatch(getOnboardingByIdAction({ id: this.id }));
      }
    }

    this.store.pipe(select(getOnboardingSelector), takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) {
          const { type, personal, spouse, occupants, vehicles, documents } = res;

          

          switch (this._step) {
            case OnboardingEntityType.ONBOARDINGTYPE:
              if (type) this.form.get(STRTYPE).patchValue(type);
              break;
            case OnboardingEntityType.ONBOARDINGPERSONAL:
              if (personal) this.getPersonalForm.patchValue(personal, { emitEvent: false });
              break;
            case OnboardingEntityType.ONBOARDINGSPOUSE:
              if (spouse) this.getSpouseForm.patchValue(spouse, { emitEvent: false });
              break;
            case OnboardingEntityType.ONBOARDINGOCCUPANTS:
              if (occupants) {
                this.getOccupantsForm.clear();
                occupants?.forEach(occupant => {
                  this.FormOccupantsArr = this.getOccupantsForm;
                  this.FormOccupantsArr.push(this.createOccupantItem(Object.assign({}, occupant)));
                });
              }
              break;
            case OnboardingEntityType.ONBOARDINGVEHICLES:
              if (vehicles) {
                this.getVehiclesForm.clear();
                vehicles?.forEach(vehicle => {
                  this.FormVehiclesArr = this.form.get(STRVEHICLES) as FormArray;
                  this.FormVehiclesArr.push(this.createVehicleItem(Object.assign({}, vehicle)));
                });
              }
              break;
            case OnboardingEntityType.ONBOARDINGDOCUMENTS:
              if (documents) {
                documents?.forEach(document => {
                  this.formDocumentsArr = this.getDocumentsForm;
                  this.formDocumentsArr.push(this.createDocumentItem(Object.assign({}, document)));
                });
              }
              break;
            case OnboardingEntityType.ONBOARDINGREVIEW:
              break;
          }
        }
      });
    this.cdRef.detectChanges();
  }

  public get getDocumentFiles(): any {
    const ret = this.formDocumentsArr?.controls.map(doc => {
      return doc?.value;
    });
    return ret;
  }

  public get getVehiclesFormArr(): FormArray {
    return this.form.get(STRVEHICLES)['controls'] as any;
  }

  public get hasVehicles(): boolean {
    return this.getVehiclesFormArr?.length > 0;
  }

  public get getVehiclesForm(): FormArray {
    return this.form.get(STRVEHICLES) as FormArray;
  }

  public get getOccupantsArr(): any[] {
    return this.form.get(STROCCUPANTS)['controls'] as any;
  }

  public get hasOccupants(): boolean {
    return this.getOccupantsArr?.length > 0;
  }

  public get getOccupantsForm(): FormArray {
    return this.form.get(STROCCUPANTS) as FormArray;
  }

  public get getDocumentsForm(): FormArray {
    return this.form.get(STRDOCUMENTS) as FormArray;
  }

  public get getDocumentsControls(): any[] {
    return this.form.get(STRVEHICLES)['controls'] as any;
  }

  public get getPersonalForm(): FormGroup {
    return this.form.get(STRPERSONAL) as FormGroup;
  }

  public get getSpouseForm(): FormGroup {
    return this.form.get(STRSPOUSE) as FormGroup;
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
    this.router.navigateByUrl(route);
  }

  public onPrev(route?: string, formName?: string, formValues?: any): void {
    if (formName && formValues) {
      this.storageSrv.set(formName, JSON.stringify(formValues));
    }

    this.storageSrv.set('step', String(Number(this._step) - 1));
    this.router.navigateByUrl(route);
  }

  protected clearStorage(): void {
    this.storageSrv.remove('type');
    this.storageSrv.remove('personal');
    this.storageSrv.remove('spouse');
    this.storageSrv.remove('occupants');
    this.storageSrv.remove('vehicles');
    this.storageSrv.remove('documents');
  }
}
