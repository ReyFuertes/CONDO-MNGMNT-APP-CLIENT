import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take, takeUntil } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGDOCUMENTS, ONBOARDINGREVIEW, STRDOCUMENTS, STROCCUPANTS, STRPERSONAL, STRSPOUSE, STRTYPE, STRVEHICLES } from 'src/app/shared/constants/generic';
import { ISimpleItem, OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { createOnboardingAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { getDocumentsSelector, getOnboardingSelector } from '../../store/onboarding.selector';
import * as _ from 'lodash';
import { ONBOARDINGDOCUMENTSROUTE } from 'src/app/shared/constants/routes';
import { v4 as uuid } from 'uuid';
import { CamelToSnakeCase } from 'src/app/shared/util/formating';

@Component({
  selector: 'cma-on-boarding-review',
  templateUrl: './on-boarding-review.component.html',
  styleUrls: ['./on-boarding-review.component.scss']
})
export class OnboardingReviewComponent extends GenericOnBoardingComponent implements OnInit {
  public uploadDocuments: ISimpleItem[] = [{
    label: 'Amenities Registration Form',
    value: ''
  }, {
    label: 'Move-in Notice & Clearance Form',
    value: ''
  }, {
    label: 'Residents Information Sheet',
    value: ''
  }, {
    label: 'Vehicle Registration & Car Sticker Form',
    value: ''
  }, {
    label: 'ID Card Application Form',
    value: ''
  }, {
    label: 'Signature Information Card',
    value: ''
  }, {
    label: 'Waiver',
    value: ''
  }, {
    label: 'Contract',
    value: ''
  }];
  public svgPath: string = environment.svgPath;
  public camelToSnakeCase = CamelToSnakeCase;
  public uploadedDocs: any[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>,
    private _storageSrv: StorageService, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>) {
    super(ONBOARDINGREVIEW, storageSrv, router, cdRef, fb, store);

    this.form = this._fb.group({
      type: [null],
      personal: this._fb.group({
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
      spouse: this._fb.group({
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
  }

  ngOnInit(): void {
    this._store.pipe(select(getOnboardingSelector), takeUntil(this.$unsubscribe))
      .subscribe(res => {
        const { type, personal, spouse, occupants, vehicles, documents } = res;

        if (type) this.form.get(STRTYPE).patchValue(type);

        if (personal) this.form.get(STRPERSONAL).patchValue(personal);

        if (spouse) this.form.get(STRSPOUSE).patchValue(spouse);

        if (occupants) {
          this.FormOccupantsArr = this.form.get(STROCCUPANTS) as FormArray;
          occupants?.forEach(occupant => {
            this.FormOccupantsArr.push(this.createOccupantItem(occupant));
          });
        };
        if (vehicles) {
          this.FormVehiclesArr = this.form.get(STRVEHICLES) as FormArray;
          vehicles?.forEach(vehicle => {
            this.FormVehiclesArr.push(this.createVehicleItem(vehicle));
          });
        };
        if (documents) this.uploadedDocs = documents;
      })
  }

  public get hasDocs(): boolean {
    return this.uploadedDocs?.length > 0;
  }

  public get getPersonalIdFileName(): any {
    return this.form.get('personal')?.value?.uploadPersonalIdFile?.name;
  }

  public get getSpouseIdFileName(): any {
    return this.form.get('spouse')?.value?.uploadSpouseIdFile?.name;
  }

  private processFormData(files: FormData): any {
    return Object.values(this.uploadedDocs?.map(doc => {
      const filename = `${uuid()}.${doc.name.split('.').pop()}`;

      files.append('files', doc, filename);

      return {
        name: filename,
        size: doc.size,
        type: doc.type,
        onboarding_id: '',
        lastModified: doc.lastModified,
        lastModifiedDate: doc.lastModifiedDate
      }
    })) || null;
  }

  private processImageData(image: any, files: FormData): any {
    if(!image?.name) return null;
    
    files.append('files', image, image?.name);
 
    return {
      name: image?.name,
      size: image.size,
      type: image.type,
      onboarding_id: '',
      lastModified: image.lastModified
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { personal, spouse, occupants, vehicles } = this.form.value;
      const { uploadPersonalIdFile } = personal;
      const { uploadSpouseIdFile } = spouse;

      let files = new FormData();
      const documents = this.processFormData(files);

      let personalFormData = new FormData();
      const personalImageData = this.processImageData(uploadPersonalIdFile, personalFormData);

      let spouseFormData = new FormData();
      const spouseImageData = this.processImageData(uploadSpouseIdFile, spouseFormData)

      const payload = {
        personal: {
          ...personal,
          civilStatus: this.form.get(STRPERSONAL).value?.civilStatus?.value
        },
        spouse,
        occupants,
        vehicles,
        documents,
        files
      };
      setTimeout(() => {
        this._store.dispatch(createOnboardingAction({
          payload,
          files,
          personalIdAttachment: {
            data: personalFormData,
            image: personalImageData
          },
          spouseIdAttachment: {
            data: spouseFormData,
            image: spouseImageData
          }
        }));
      }, 100);
    }
  }

  public get getOccupants(): any[] {
    return this.form.get(STROCCUPANTS)['controls'] || [];
  }

  public get getVehicles(): any[] {
    return this.form.get(STRVEHICLES)['controls'] || [];
  }

  public get hasVehicles(): boolean {
    return this.getVehicles.length > 0;
  }

  public get hasOccupants(): boolean {
    return this.getOccupants.length > 0;
  }

  public get hasDocuments(): boolean {
    return this.uploadedDocs.filter(i => Boolean(i))?.length > 0;
  }

  public get getPersonalForm(): FormGroup {
    return this.form.controls[STRPERSONAL] as FormGroup;
  }

  public get getSpouseForm(): FormGroup {
    return this.form.controls[STRSPOUSE] as FormGroup;
  }

  public get getOccupantsForm(): FormArray {
    return this.form.controls[STROCCUPANTS] as FormArray;
  }

  public get getDocumentsForm(): FormGroup {
    return this.form.controls[STRDOCUMENTS] as FormGroup;
  }

  public get getVehiclesForm(): FormGroup {
    return this.form.controls[STRVEHICLES] as FormGroup;
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGDOCUMENTSROUTE);

    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }
}
