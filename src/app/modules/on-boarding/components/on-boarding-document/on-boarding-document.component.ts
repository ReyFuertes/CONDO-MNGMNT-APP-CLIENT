import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGDOCUMENTS, ONBOARDINGOCCUPANTS, ONBOARDINGREVIEW } from 'src/app/shared/constants/generic';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { IOnboardingDocument } from '../../on-boarding.model';
import { setOnboardingStepperAction } from '../../store/onboarding.action';

@Component({
  selector: 'cma-on-boarding-document',
  templateUrl: './on-boarding-document.component.html',
  styleUrls: ['./on-boarding-document.component.scss']
})
export class OnboardingDocumentComponent extends GenericOnBoardingComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public uploadDocuments: IOnboardingDocument[] = [{
    label: 'Amenities Registration Form',
    value: '1',
    formName: 'amenitiesRegistrationForm'
  }, {
    label: 'Move-in Notice & Clearance Form',
    value: '2',
    formName: 'moveinNoticeClearanceForm'
  }, {
    label: 'Residents Information Sheet',
    value: '3',
    formName: 'residentsInformationSheet'
  }, {
    label: 'Vehicle Registration & Car Sticker Form',
    value: '4',
    formName: 'vehicleRegistrationCarStickerForm'
  }, {
    label: 'ID Card Application Form',
    value: '5',
    formName: 'idCardApplicationForm'
  }, {
    label: 'Signature Information Card',
    value: '6',
    formName: 'signatureInformationCard'
  }, {
    label: 'Waiver',
    value: '7',
    formName: 'waiver'
  }, {
    label: 'Contract',
    value: '8',
    formName: 'contract'
  }];

  constructor(storageSrv: StorageService, router: Router, private fb: FormBuilder, private store: Store<AppState>) {
    super(ONBOARDINGDOCUMENTS, storageSrv, router);
    this.form = this.fb.group({
      amenitiesRegistrationForm: [null, [Validators.required]],
      moveinNoticeClearanceForm: [null, [Validators.required]],
      residentsInformationSheet: [null, [Validators.required]],
      vehicleRegistrationCarStickerForm: [null, [Validators.required]],
      idCardApplicationForm: [null, [Validators.required]],
      signatureInformationCard: [null, [Validators.required]],
      waiver: [null, [Validators.required]],
      contract: [null, [Validators.required]]
    });

    this.form.valueChanges.subscribe(res => console.log(this.form))
  }

  ngOnInit(): void { }

  public onUpload(event: any, doc: IOnboardingDocument): void {
    doc.file = event;
    this.form.get(doc.formName).patchValue(doc);
  }

  public hasFile(prevLabel: any, currLabel: any): boolean {
    return prevLabel && prevLabel !== currLabel ? true : false;
  }

  public onNext(): void {
    super.onNext('/on-boarding/review', 'documents', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGREVIEW }));
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/occupants', 'documents', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }
}
