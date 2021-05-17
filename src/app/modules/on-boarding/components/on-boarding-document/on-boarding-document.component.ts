import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { IOnboardingDocument } from '../../on-boarding.model';
import { addDocumentsAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { getDocumentsSelector } from '../../store/onboarding.selector';
import { ONBOARDINGVEHICLESROUTE, ONBOARDINGREVIEWROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'cma-on-boarding-document',
  templateUrl: './on-boarding-document.component.html',
  styleUrls: ['./on-boarding-document.component.scss']
})
export class OnboardingDocumentComponent extends GenericOnBoardingComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public uploadedDocs: any[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder, private _storageSrv: StorageService) {
    super(OnboardingEntityType.ONBOARDINGDOCUMENTS, storageSrv, router, cdRef, fb);

    this.form = this._fb.group({
      documents: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getDocumentsSelector),
      take(1))
      .subscribe(docs => {
        if (docs) {
          this.form.patchValue(docs);
        } else {
          // const docs = this._storageSrv.get('documents');
          // if (docs) {
          //   this.form.patchValue(JSON.parse(docs));
          // }
        }
      });
  }

  public getFileName(document: any): any {
    return this.form.get(document?.formName)?.value?.file?.name || document?.label;
  }

  public onUpload(event: any) {
    this.uploadedDocs.push(event.files[0]);
  }

  public hasFile(prevLabel: any, currLabel: any): boolean {
    return prevLabel && prevLabel !== currLabel ? true : false;
  }

  public onNext(): void {
    /* we need to sstore files in a the state since localstorage doesnt support it */
    this.store.dispatch(addDocumentsAction({ documents: this.uploadedDocs }));

    super.onNext(ONBOARDINGREVIEWROUTE, 'documents', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: OnboardingEntityType.ONBOARDINGREVIEW }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGVEHICLESROUTE, 'documents', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: OnboardingEntityType.ONBOARDINGVEHICLES }));
  }
}
