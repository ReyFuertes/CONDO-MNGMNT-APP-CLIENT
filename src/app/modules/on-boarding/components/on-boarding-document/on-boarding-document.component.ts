import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGDOCUMENTS, ONBOARDINGOCCUPANTS, ONBOARDINGREVIEW } from 'src/app/shared/constants/generic';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { IOnboardingDocument } from '../../on-boarding.model';
import { addDocumentsAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { getDocumentsSelector } from '../../store/onboarding.selector';

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

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private store: Store<AppState>, cdRef: ChangeDetectorRef, fb: FormBuilder) {
    super(OnboardingEntityType.ONBOARDINGDOCUMENTS, storageSrv, router, cdRef, fb);

    this.form = this._fb.group({
      amenitiesRegistrationForm: [null, [Validators.required]],
      moveinNoticeClearanceForm: [null, [Validators.required]],
      residentsInformationSheet: [null, [Validators.required]],
      vehicleRegistrationCarStickerForm: [null, [Validators.required]],
      idCardApplicationForm: [null, [Validators.required]],
      signatureInformationCard: [null, [Validators.required]],
      waiver: [null, [Validators.required]],
      contract: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getDocumentsSelector),
      take(1))
      .subscribe(docs => {
        if (docs) {
          this.form.patchValue(docs);
        }
      });
  }

  public getFileName(document: any): any {
    return this.form.get(document?.formName)?.value?.file?.name || document?.label;
  }

  public onUpload(event: File, doc: IOnboardingDocument): void {
    doc.file = event;
    this.form.get(doc.formName).patchValue(doc);
  }

  public hasFile(prevLabel: any, currLabel: any): boolean {
    return prevLabel && prevLabel !== currLabel ? true : false;
  }

  public onNext(): void {
    /* we need to sstore files in a the state since localstorage doesnt support it */
    this.store.dispatch(addDocumentsAction({ documents: this.form.value }));

    super.onNext('/on-boarding/review', 'documents', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGREVIEW }));
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/occupants', 'documents', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }
}
