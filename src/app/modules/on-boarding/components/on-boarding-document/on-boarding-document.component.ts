import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { addDocumentsAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { ONBOARDINGVEHICLESROUTE, ONBOARDINGREVIEWROUTE } from 'src/app/shared/constants/routes';
import { STRDOCUMENTS } from 'src/app/shared/constants/generic';
import * as _ from 'lodash';

@Component({
  selector: 'cma-on-boarding-document',
  templateUrl: './on-boarding-document.component.html',
  styleUrls: ['./on-boarding-document.component.scss']
})
export class OnboardingDocumentComponent extends GenericOnBoardingComponent {
  public svgPath: string = environment.svgPath;

  constructor(private _cdRef: ChangeDetectorRef, storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder, private _storageSrv: StorageService, store: Store<RooState>) {
    super(OnboardingEntityType.ONBOARDINGDOCUMENTS, storageSrv, router, cdRef, fb, store);

    this.form = this._fb.group({
      documents: new FormArray([]),
    });
  }

  public getFileName(document: any): any {
    return this.form.get(document?.formName)?.value?.file?.name || document?.label;
  }

  public onUpload(event: any) {
    let uploadedDocs = Object.assign([], this.uploadedDocs);
    uploadedDocs.push(event?.files[0]);

    this.uploadedDocs = uploadedDocs;
  }

  public onRemove(event: any): void {
    let uploadedDocs = Object.assign([], this.uploadedDocs);

    _.remove(uploadedDocs, { name: event?.file?.name });
    this.uploadedDocs = uploadedDocs;
  }

  public hasFile(prevLabel: any, currLabel: any): boolean {
    return prevLabel && prevLabel !== currLabel ? true : false;
  }

  public onNext(): void {
    super.onNext(ONBOARDINGREVIEWROUTE, STRDOCUMENTS, this.form.value);

    this._store.dispatch(addDocumentsAction({ documents: this.uploadedDocs }));
    this._store.dispatch(setOnboardingStepperAction({ step: OnboardingEntityType.ONBOARDINGREVIEW }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGVEHICLESROUTE, STRDOCUMENTS, this.form.value);

    this._store.dispatch(addDocumentsAction({ documents: this.uploadedDocs }));
    this._store.dispatch(setOnboardingStepperAction({ step: OnboardingEntityType.ONBOARDINGVEHICLES }));
  }
}
