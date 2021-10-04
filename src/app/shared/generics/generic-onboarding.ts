import { AfterViewInit, ChangeDetectorRef, Directive } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { IOnboarding, IOnboardingDocument, IOnboardingOccupant, IOnboardingVehicle } from 'src/app/modules/on-boarding/on-boarding.model';
import { getOnboardingByIdAction } from 'src/app/modules/on-boarding/store/onboarding.action';
import { getOnboardingSelector, onboardingLoadedSelector } from 'src/app/modules/on-boarding/store/onboarding.selector';
import { StorageService } from 'src/app/services/storage.service';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { BUILDINGNOOPTIONS, CIVILOPTIONS, GENDEROPTIONS, IDTYPEOPTIONS, PARTKINGNOOPTIONS, RELATIONSOPTIONS, STRDOCUMENTS, STROCCUPANTS, STRPERSONAL, STRSPOUSE, STRVEHICLES, UNITNOOPTIONS, STRTYPE } from '../constants/generic';
import * as moment from "moment";
import { GenericDestroyPageComponent } from './generic-destroy';
import { OnboardingEntityType } from './generic-model';
import { GetFirstLetter } from '../util/formating';

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
      id: [null, Validators.required],
      type: [null, Validators.required],
      personal: this.fb.group({
        id: [null, Validators.required],
        buildingNo: [null, Validators.required],
        unitNo: [null, Validators.required],
        parkingSlot: [null, Validators.required],
        occupantType: [null, Validators.required],
        lastname: [null, Validators.required],
        firstname: [null, Validators.required],
        middlename: [null, Validators.required],
        citizenship: [null, Validators.required],
        gender: [null, Validators.required],
        civilStatus: [null, Validators.required],
        dateOfBirth: [new Date(), Validators.required],
        occupation: [null, Validators.required],
        busAddress: [null],
        busContactNo: [null],
        busEmail: [null],
        tin: [null],
        idType: [null, Validators.required],
        idNo: [null, Validators.required],
        uploadPersonalIdFile: [null, Validators.required],
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
      .subscribe(res => this.onboardingLoaded = res);
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
          const { id, type, personal, spouse, occupants, vehicles, documents, documentsToUpload } = res;

          this.form.get('id').patchValue(id, { emitEvent: false });

          switch (this._step) {
            case OnboardingEntityType.ONBOARDINGTYPE:
              if (type) this.form.get(STRTYPE).patchValue(type);
              break;
            case OnboardingEntityType.ONBOARDINGPERSONAL:
              if (personal) {
                const _personal = {
                  ...personal,
                  dateOfBirth: moment(personal?.dateOfBirth || new Date()).toDate(),
                };
                this.getPersonalForm.patchValue(_personal, { emitEvent: false });
              }
              break;
            case OnboardingEntityType.ONBOARDINGSPOUSE:
              if (spouse) {
                const _spouse = {
                  ...spouse,
                  dateOfBirth: moment(spouse?.dateOfBirth || new Date()).toDate(),
                };
                this.getSpouseForm.patchValue(_spouse, { emitEvent: false });
              }
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
                this.getDocumentsForm.clear();
                documents?.forEach(document => {
                  this.formDocumentsArr = this.getDocumentsForm;
                  if (document?.id) {
                    this.formDocumentsArr.push(this.createDocumentItem(Object.assign({}, document)));
                  }
                });
                this.toUploadDocs = documentsToUpload || [];
              }
              break;
            case OnboardingEntityType.ONBOARDINGREVIEW:
              break;
          }
        }
      });
    this.cdRef.detectChanges();
  }

  protected getName(form: FormGroup, compName: string = ''): any {
    return `${GetFirstLetter(form.get('lastname')?.value)}${GetFirstLetter(form.get('firstname')?.value)}_${compName}`.toLowerCase()?.replace(/ /g,'_');
  }

  public get hasToUploadDocs(): boolean {
    return this.toUploadDocs?.length > 0;
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

  public get getOccupantsArr(): FormArray {
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

  protected routeTo(url: string): void {
    this.router.navigateByUrl(url);
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
