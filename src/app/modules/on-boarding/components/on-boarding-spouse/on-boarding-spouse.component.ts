import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { Router } from '@angular/router';
import { addToSpouseAction, setOnboardingStepperAction, updateOnboardingSpouseValuesAction } from '../../store/onboarding.action';
import { ONBOARDINGOCCUPANTS, ONBOARDINGPERSONAL, STRSPOUSE } from 'src/app/shared/constants/generic';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as moment from 'moment';
import { ONBOARDINGOCCUPANTSROUTE, ONBOARDINGPERSONALROUTE } from 'src/app/shared/constants/routes';
import { takeUntil } from 'rxjs/operators';
import { IOnboarding } from '../../on-boarding.model';

@Component({
  selector: 'cma-on-boarding-spouse',
  templateUrl: './on-boarding-spouse.component.html',
  styleUrls: ['./on-boarding-spouse.component.scss']
})
export class OnboardingSpouseInfoComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>,
    cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>, private _cdRef: ChangeDetectorRef) {
    super(OnboardingEntityType.ONBOARDINGSPOUSE, storageSrv, router, cdRef, fb, store);

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe))
      .subscribe((payload: IOnboarding) => {
        if (payload?.spouse?.id) {
          this._store.dispatch(updateOnboardingSpouseValuesAction({ payload }));
        }
      });
  }

  ngOnInit(): void { 
    this._cdRef.detectChanges();
  }

  public onSpouseImageChange(event: any): void {
    let file: any
    if (_.isObject(event)) {
      file = event;
    } else {
      file = event.target.files[0];
    }
    this.getSpouseForm.get('uploadSpouseIdFile').patchValue(file);
  }

  public getFileName(formName: string): string {
    return this.getSpouseForm.get(formName)?.value?.name;
  }

  public onNext(): void {
    const { dateOfBirth } = this.getSpouseForm.value;
    super.onNext(ONBOARDINGOCCUPANTSROUTE(this.id), STRSPOUSE, {
      ...this.getSpouseForm.value,
      dateOfBirth: dateOfBirth ? moment(new Date(dateOfBirth)).format('MM-DD-YYYY') : null
    });

    this._store.dispatch(addToSpouseAction({ payload: this.getSpouseForm.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGPERSONALROUTE(this.id), STRSPOUSE, this.getSpouseForm.value);

    this._store.dispatch(addToSpouseAction({ payload: this.getSpouseForm.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }
}