import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take, takeUntil } from 'rxjs/operators';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { Router } from '@angular/router';
import { setOnboardingStepperAction } from '../../store/onboarding.action';
import { ONBOARDINGDOCUMENTS, ONBOARDINGOCCUPANTS, ONBOARDINGSPOUSE, ONBOARDINGPERSONAL } from 'src/app/shared/constants/generic';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as moment from 'moment';

@Component({
  selector: 'cma-on-boarding-spouse-info',
  templateUrl: './on-boarding-spouse-info.component.html',
  styleUrls: ['./on-boarding-spouse-info.component.scss']
})
export class OnboardingPartnerInfoComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private store: Store<RooState>,
    cdRef: ChangeDetectorRef, fb: FormBuilder) {
    super(OnboardingEntityType.ONBOARDINGSPOUSE, storageSrv, router, cdRef, fb);

    this.form = this._fb.group({
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
    const { dateOfBirth } = this.form.value;
    super.onNext('/on-boarding/occupants', 'spouse', {
      ...this.form.value,
      dateOfBirth: dateOfBirth ? moment(new Date(dateOfBirth)).format('MM-DD-YYYY') : null
    });

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/personal', 'spouse', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }
}