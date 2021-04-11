import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take, takeUntil } from 'rxjs/operators';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import { setOnboardingStepperAction } from '../../store/onboarding.action';
import { ONBOARDINGDOCUMENTS, ONBOARDINGOCCUPANTS, ONBOARDINGPARTNER, ONBOARDINGPERSONAL } from 'src/app/shared/constants/generic';

@Component({
  selector: 'cma-on-boarding-partner-info',
  templateUrl: './on-boarding-partner-info.component.html',
  styleUrls: ['./on-boarding-partner-info.component.scss']
})
export class OnboardingPartnerInfoComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(storageSrv: StorageService, router: Router, private fb: FormBuilder, private store: Store<AppState>) {
    super(ONBOARDINGPARTNER, storageSrv, router);

    this.form = this.fb.group({
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
    });
  }

  ngOnInit(): void { }

  public onPartnerImageChange(event: any): void {
    let file: any
    if (_.isObject(event)) {
      file = event;
    } else {
      file = event.target.files[0];
    }
    this.files.push(file);
    this.onConvertBlobToBase64(event, file, 'partnerUploadedIdFile');
  }

  private onConvertBlobToBase64(event: any, file: any, formName: string): any {
    /* collect all drop images in base64 results */
    convertBlobToBase64(event).pipe(take(1),
      takeUntil(this.$unsubscribe),
      map(b64Result => {
        return {
          image: b64Result,
          filename: `${uuid()}.${file.name.split('?')[0].split('.').pop()}`,
          file: file,
          size: file.size,
          mimetype: file.type
        }
      })).subscribe((b64Image) => {
        if (formName === 'partnerUploadedIdFile') {
          this.form.get('partnerUploadedFilePreview').patchValue(b64Image?.image);
        }
        this.form.get(formName).patchValue(b64Image);
      });
  }

  public get getPartnerUploadedFilePreview(): any {
    return this.form.get('partnerUploadedFilePreview')?.value;
  }

  public getImagePreview(formName: string): any {
    return this.form.get(formName)?.value?.filename;
  }

  public onNext(): void {
    super.onNext('/on-boarding/occupants', 'partner', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/personal', 'partner', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }
}