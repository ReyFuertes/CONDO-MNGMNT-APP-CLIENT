import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OccupantType } from 'src/app/models/onboarding.model';
import * as _ from 'lodash';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import { setOnboardingStepperAction } from '../../store/onboarding.action';
import { OCCUPANTOPTIONS, ONBOARDINGPARTNER, ONBOARDINGPERSONAL, ONBOARDINGTYPE } from 'src/app/shared/constants/generic';

@Component({
  selector: 'cma-on-boarding-personal',
  templateUrl: './on-boarding-personal.component.html',
  styleUrls: ['./on-boarding-personal.component.scss']
})
export class OnboardingPersonalComponent extends GenericOnBoardingComponent implements OnInit {
  public occupantOptions = OCCUPANTOPTIONS;
  public files: File[] = [];

  constructor(storageSrv: StorageService, router: Router, private fb: FormBuilder,
    private store: Store<AppState>, public _storageSrv: StorageService) {
    super(ONBOARDINGPERSONAL, storageSrv, router);

    this.form = this.fb.group({
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
      busEmail: [null, [Validators.required, Validators.email]],
      tin: [null, [Validators.required]],
      idType: [null, [Validators.required]],
      idNo: [null, [Validators.required]],
      uploadedIdFile: [null],
      uploadedFilePreview: [null],
    });
  }

  ngOnInit(): void {
    this.form.get('occupantType').patchValue({
      label: 'Home Owner',
      value: String(OccupantType.HomeOwner)
    });
  }

  public onPersonalImageChange(event: any): void {
    let file: any
    if (_.isObject(event)) {
      file = event;
    } else {
      file = event.target.files[0];
    }
    this.files.push(file);
    this.onConvertBlobToBase64(event, file, 'uploadedIdFile');
  }

  private onConvertBlobToBase64(event: any, file: any, formName: string): any {
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
        debugger
        if (formName === 'uploadedIdFile') {
          this.form.get('uploadedFilePreview').patchValue(b64Image?.image);
        }
        this.form.get(formName).patchValue(b64Image);
      });
  }

  public get getPersonalUploadedFilePreview(): any {
    return this.form.get('uploadedFilePreview')?.value;
  }

  public getImagePreview(formName: string): any {
    return this.form.get(formName)?.value?.filename;
  }

  public onNext(): void {
    super.onNext('/on-boarding/partner', 'personal', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPARTNER }));

  }

  public onPrev(): void {
    super.onPrev('/on-boarding/type', 'personal', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGTYPE }));
  }
}
