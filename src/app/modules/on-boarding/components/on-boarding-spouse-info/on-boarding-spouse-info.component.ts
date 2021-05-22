import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { Router } from '@angular/router';
import { addToSpouseAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { ONBOARDINGOCCUPANTS, ONBOARDINGPERSONAL, STRSPOUSE } from 'src/app/shared/constants/generic';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as moment from 'moment';
import { ONBOARDINGOCCUPANTSROUTE, ONBOARDINGPERSONALROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'cma-on-boarding-spouse-info',
  templateUrl: './on-boarding-spouse-info.component.html',
  styleUrls: ['./on-boarding-spouse-info.component.scss']
})
export class OnboardingSpouseInfoComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>,
    cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>) {
    super(OnboardingEntityType.ONBOARDINGSPOUSE, storageSrv, router, cdRef, fb, store);

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
      uploadSpouseIdFile: [null],
      uploadSpouseIdFilePreview: [null]
    });
  }

  ngOnInit(): void { }

  public onSpouseImageChange(event: any): void {
    let file: any
    if (_.isObject(event)) {
      file = event;
    } else {
      file = event.target.files[0];
    }
    this.form.get('uploadSpouseIdFile').patchValue(file);
  }

  public getFileName(formName: string): string {
    return this.form.get(formName)?.value?.name;
  }

  public onNext(): void {
    const { dateOfBirth } = this.form.value;
    super.onNext(ONBOARDINGOCCUPANTSROUTE, STRSPOUSE, {
      ...this.form.value,
      dateOfBirth: dateOfBirth ? moment(new Date(dateOfBirth)).format('MM-DD-YYYY') : null
    });

    this._store.dispatch(addToSpouseAction({ payload: this.form.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGPERSONALROUTE, STRSPOUSE, this.form.value);

    this._store.dispatch(addToSpouseAction({ payload: this.form.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }
}