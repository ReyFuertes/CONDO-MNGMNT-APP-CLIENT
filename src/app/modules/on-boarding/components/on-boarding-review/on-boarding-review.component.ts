import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGDOCUMENTS, ONBOARDINGREVIEW } from 'src/app/shared/constants/generic';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { setOnboardingStepperAction } from '../../store/onboarding.action';

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

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private store: Store<AppState>,
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
      partner: this._fb.group({
        lastname: ['fuertes'],
        firstname: ['haydee'],
        middlename: ['Alolor'],
        citizenship: ['filipino'],
        gender: [null],
        civilStatus: [null],
        dateOfBirth: ['04/10/2021'],
        occupation: ['none'],
        busAddress: ['none'],
        busContactNo: ['none'],
        busEmail: ['none'],
        tin: ['1234567890'],
        idType: [null],
        idNo: ['1234567890'],
        uploadedIdFile: [null],
        uploadedFilePreview: [null]
      }),
      occupants: new FormArray([]),
      documents: this._fb.group({
        amenitiesRegistrationForm: [null, [Validators.required]],
        moveinNoticeClearanceForm: [null, [Validators.required]],
        residentsInformationSheet: [null, [Validators.required]],
        vehicleRegistrationCarStickerForm: [null, [Validators.required]],
        idCardApplicationForm: [null, [Validators.required]],
        signatureInformationCard: [null, [Validators.required]],
        waiver: [null, [Validators.required]],
        contract: [null, [Validators.required]]
      })
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

    const partner = _storageSrv.get('partner');
    if (partner) {
      this.form.get('partner').patchValue(JSON.parse(partner));
    }

    const occupants = _storageSrv.get('occupants');
    if (occupants) {
      const occupantsArr = JSON.parse(occupants)?.occupants;
      this.formOccupantsArr = this.form.get('occupants') as FormArray;

      occupantsArr.forEach(occupant => {
        this.formOccupantsArr.push(this.createItem(Object.assign({}, occupant)));
      });
    }

    const documents = _storageSrv.get('documents');
    if (documents) {
      this.form.get('documents').patchValue(JSON.parse(documents));
    }
  }

  ngOnInit(): void { }

  public get getDocuments(): any {
    const docNames = Object.keys(this.form.get('documents').value);
    return docNames.map(d => this.form.get('documents').get(d).value)
  }

  public get getPersonalForm(): FormGroup {
    return this.form.controls['personal'] as FormGroup;
  }

  public get getPartnerForm(): FormGroup {
    return this.form.controls['partner'] as FormGroup;
  }

  public get getOccupantsForm(): FormArray {
    return this.form.controls['occupants'] as FormArray;
  }

  public get getDocumentsForm(): FormGroup {
    return this.form.controls['documents'] as FormGroup;
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/documents');

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }
}
