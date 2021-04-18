import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGDOCUMENTS, ONBOARDINGREVIEW } from 'src/app/shared/constants/generic';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { createOnboardingAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { getDocumentsSelector } from '../../store/onboarding.selector';
import * as _ from 'lodash';
import { ONBOARDINGDOCUMENTSROUTE } from 'src/app/shared/constants/routes';
import { IOnboardingDocument } from '../../on-boarding.model';
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
  public formOccupantsArr: FormArray;
  public formVehiclesArr: FormArray;
  public camelToSnakeCase = CamelToSnakeCase;
  public uploadedDocs: any[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private store: Store<RooState>,
    private _storageSrv: StorageService, cdRef: ChangeDetectorRef, fb: FormBuilder) {
    super(ONBOARDINGREVIEW, storageSrv, router, cdRef, fb);

    this.form = this._fb.group({
      type: [null, [Validators.required]],
      personal: this._fb.group({
        buildingNo: [null, [Validators.required]],
        unitNo: [null, [Validators.required]],
        parkingSlot: [null, [Validators.required]],
        occupantType: [null, [Validators.required]],
        lastname: [null, [Validators.required]],
        firstname: [null, [Validators.required]],
        middlename: [null, [Validators.required]],
        citizenship: [null, [Validators.required]],
        gender: [null, [Validators.required]],
        civilStatus: [null, [Validators.required]],
        dateOfBirth: [null, [Validators.required]],
        occupation: [null, [Validators.required]],
        busAddress: [null, [Validators.required]],
        busContactNo: [null, [Validators.required]],
        busEmail: [null, [Validators.required]],
        tin: [null, [Validators.required]],
        idType: [null, [Validators.required]],
        idNo: [null, [Validators.required]],
        uploadedIdFile: [null],
        uploadedFilePreview: [null]
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
        uploadedIdFile: [null],
        uploadedFilePreview: [null]
      }),
      occupants: new FormArray([]),
      vehicles: new FormArray([]),
      documents: new FormArray([])
    });

    /* get all values from localstorage */
    const type = _storageSrv.get('type');
    if (type) {
      this.form.get('type').patchValue(JSON.parse(type))
    }
    const personal = _storageSrv.get('personal');
    if (personal) {
      this.form.get('personal').patchValue(JSON.parse(personal));
    }
    const spouse = _storageSrv.get('spouse');
    if (spouse) {
      this.form.get('spouse').patchValue(JSON.parse(spouse));
    }
    const occupants = _storageSrv.get('occupants');
    if (occupants) {
      const occupantsArr = JSON.parse(occupants)?.occupants;
      this.formOccupantsArr = this.form.get('occupants') as FormArray;

      occupantsArr.forEach(occupant => {
        this.formOccupantsArr.push(this.createItem(Object.assign({}, occupant)));
      });
    }
    const vehicles = _storageSrv.get('vehicles');
    if (vehicles) {
      const vehiclesArr = JSON.parse(vehicles)?.vehicles;
      this.formVehiclesArr = this.form.get('vehicles') as FormArray;

      vehiclesArr.forEach(vehicle => {
        this.formVehiclesArr.push(this.createItem(Object.assign({}, vehicle)));
      });
    }
  }

  ngOnInit(): void {
    this.store.pipe(select(getDocumentsSelector),
      take(1))
      .subscribe(docs => {
        if (docs) this.uploadedDocs = docs;
      });
  }

  private processFormData(files: FormData): any {
    return Object.values(this.uploadedDocs?.map(doc => {
      files.append('files', doc, doc.name);
      return {
        name: doc.name,
        size: doc.size,
        type: doc.type,
        lastModified: doc.lastModified,
        lastModifiedDate: doc.lastModifiedDate
      }
    })) || null;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { personal, spouse, occupants, vehicles } = this.form.value;
      const files = new FormData();
      files.set('name', String(`${personal?.firstname}_${personal?.lastname}`).toLowerCase());

      const documents = this.processFormData(files)

      const payload = {
        personal: {
          ...personal,
          civilStatus: this.form.get('personal').value?.civilStatus?.value
        },
        spouse,
        occupants,
        vehicles,
        documents,
        files
      }
      setTimeout(() => {
        this.store.dispatch(createOnboardingAction({ payload, files }));
      }, 100);
    }
  }

  public get getOccupants(): any[] {
    return this.form.get('occupants')['controls'] || [];
  }

  public get getVehicles(): any[] {
    return this.form.get('vehicles')['controls'] || [];
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
    return this.form.controls['personal'] as FormGroup;
  }

  public get getPartnerForm(): FormGroup {
    return this.form.controls['spouse'] as FormGroup;
  }

  public get getOccupantsForm(): FormArray {
    return this.form.controls['occupants'] as FormArray;
  }

  public get getDocumentsForm(): FormGroup {
    return this.form.controls['documents'] as FormGroup;
  }

  public get getVehiclesForm(): FormGroup {
    return this.form.controls['vehicles'] as FormGroup;
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGDOCUMENTSROUTE);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }
}
