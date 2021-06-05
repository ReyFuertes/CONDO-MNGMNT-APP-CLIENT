import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { addDocumentsAction, setOnboardingStepperAction, updateOnboardingDocumentsValuesAction } from '../../store/onboarding.action';
import { ONBOARDINGVEHICLESROUTE, ONBOARDINGREVIEWROUTE } from 'src/app/shared/constants/routes';
import { STRDOCUMENTS } from 'src/app/shared/constants/generic';
import * as _ from 'lodash';
import { IOnboardingDocument } from '../../on-boarding.model';

@Component({
  selector: 'cma-on-boarding-document',
  templateUrl: './on-boarding-document.component.html',
  styleUrls: ['./on-boarding-document.component.scss']
})
export class OnboardingDocumentComponent extends GenericOnBoardingComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public documentUrl: string = environment.documentUrl;

  constructor(private _cdRef: ChangeDetectorRef, storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder, private _storageSrv: StorageService, store: Store<RooState>) {
    super(OnboardingEntityType.ONBOARDINGDOCUMENTS, storageSrv, router, cdRef, fb, store);
  }

  ngOnInit(): void { }

  public getFileName(document: any): any {
    return this.getDocumentsForm?.value?.file?.name || document?.label;
  }

  public onUpload(event: any) {
    let toUploadDocs = Object.assign([], this.toUploadDocs);
    toUploadDocs.push(event?.files[0]);

    this._store.dispatch(updateOnboardingDocumentsValuesAction({ payload: toUploadDocs }));
  }

  public get hasUploadedDocs(): boolean {
    return this.getDocumentFiles?.length > 0;
  }

  public get uploadedDocsCount(): number {
    return this.getDocumentFiles?.length || 0;
  }

  public onRemove(event: any): void {
    let uploadedDocs = Object.assign([], this.toUploadDocs);

    _.remove(uploadedDocs, { name: event?.file?.name });
    this.toUploadDocs = uploadedDocs;
  }

  public onRemoveUploadedDoc(item: any, i: any): void {
    if (item) {
      this.formDocumentsArr = this.form.get(STRDOCUMENTS) as FormArray;
      this.formDocumentsArr.removeAt(i);
    }
  }

  public hasFile(prevLabel: any, currLabel: any): boolean {
    return prevLabel && prevLabel !== currLabel ? true : false;
  }

  public onNext(): void {
    super.onNext(ONBOARDINGREVIEWROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: OnboardingEntityType.ONBOARDINGREVIEW }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGVEHICLESROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: OnboardingEntityType.ONBOARDINGVEHICLES }));
  }
}

