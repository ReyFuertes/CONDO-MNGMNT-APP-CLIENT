import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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

  constructor(storageSrv: StorageService, router: Router, private fb: FormBuilder, private store: Store<AppState>,
    private _storageSrv: StorageService) {
    super(ONBOARDINGREVIEW, storageSrv, router);

    this.form = this.fb.group({
      type: [null, [Validators.required]],
      personal: this.fb.group({
        buildingNo: [null, [Validators.required]],
        unitNo: [null, [Validators.required]],
        parkingSlot: [null, [Validators.required]],
        occupantType: [null, [Validators.required]],
        lastname: ['fuertes', [Validators.required]],
        firstname: ['rey', [Validators.required]],
        middlename: ['senador', [Validators.required]],
        citizenship: ['filipino', [Validators.required]],
        gender: [null, [Validators.required]],
        civilStatus: [null, [Validators.required]],
        dateOfBirth: ['04/10/2021', [Validators.required]],
        occupation: ['none', [Validators.required]],
        busAddress: ['none', [Validators.required]],
        busContactNo: ['none', [Validators.required]],
        busEmail: ['none', [Validators.required]],
        tin: ['1234567890', [Validators.required]],
        idType: [null, [Validators.required]],
        idNo: ['1234567890', [Validators.required]],
        uploadedIdFile: [null],
        uploadedFilePreview: [null]
      }),
      partner: this.fb.group({
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
      occupants: this.fb.group({
        occupants: new FormArray([]),
      }),
      documents: this.fb.group({
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
      this.form.get('personal').patchValue(JSON.parse(personal))
    }

    const partner = _storageSrv.get('partner');
    if (partner) {
      this.form.get('partner').patchValue(JSON.parse(partner))
    }

    const occupants = _storageSrv.get('occupants');
    if (occupants) {
      this.form.get('occupants').patchValue(JSON.parse(occupants))
    }

    const documents = _storageSrv.get('documents');
    if (documents) {
      this.form.get('documents').patchValue(JSON.parse(documents))
    }
  }

  ngOnInit(): void { }

  public onPrev(): void {
    super.onPrev('/on-boarding/documents');

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }
}
