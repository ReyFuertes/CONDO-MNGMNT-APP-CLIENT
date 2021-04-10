import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGDOCUMENTS, ONBOARDINGOCCUPANTS, ONBOARDINGPARTNER, ONBOARDINGREVIEW } from 'src/app/shared/constants/generic';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
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
    value: '1'
  }, {
    label: 'Move-in Notice & Clearance Form',
    value: '2'
  }, {
    label: 'Residents Information Sheet',
    value: '3'
  }, {
    label: 'Vehicle Registration & Car Sticker Form',
    value: '4'
  }, {
    label: 'ID Card Application Form',
    value: '5'
  }, {
    label: 'Signature Information Card',
    value: '6'
  }, {
    label: 'Waiver',
    value: '7'
  }, {
    label: 'Contract',
    value: '8'
  }];

  constructor(storageSrv: StorageService, router: Router, private store: Store<AppState>) {
    super(ONBOARDINGDOCUMENTS, storageSrv, router);
  }

  ngOnInit(): void { }

  public onUpload(event: any, doc: any): void {
    doc.file = event;
  }

  public hasFile(prevLabel: any, currLabel: any): boolean {
    return prevLabel && prevLabel !== currLabel ? true : false;
  }

  public onNext(): void {
    super.onNext('/on-boarding/review');

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGREVIEW }));
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/occupants');

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }
}
