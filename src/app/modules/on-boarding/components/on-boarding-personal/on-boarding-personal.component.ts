import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OccupantType } from 'src/app/models/onboarding.model';
import * as _ from 'lodash';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { select, Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { Router } from '@angular/router';
import { addToPersonalAction, setOnboardingStepperAction, updateOnboardingPersonalValuesAction } from '../../store/onboarding.action';
import { OCCUPANTOPTIONS, ONBOARDINGSPOUSE, ONBOARDINGPERSONAL, ONBOARDINGTYPE, STRPERSONAL } from 'src/app/shared/constants/generic';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as moment from 'moment';
import { ONBOARDINGSPOUSEROUTE, ONBOARDINGTYPEROUTE } from 'src/app/shared/constants/routes';
import { takeUntil } from 'rxjs/operators';
import { FmtPayloadToForm } from 'src/app/shared/util/formating';
import { IOnboarding } from '../../on-boarding.model';
@Component({
  selector: 'cma-on-boarding-personal',
  templateUrl: './on-boarding-personal.component.html',
  styleUrls: ['./on-boarding-personal.component.scss']
})
export class OnboardingPersonalComponent extends GenericOnBoardingComponent implements OnInit {
  public occupantOptions = OCCUPANTOPTIONS;
  public files: File[] = [];

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>,
    public _storageSrv: StorageService, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>, private _cdRef: ChangeDetectorRef) {
    super(OnboardingEntityType.ONBOARDINGPERSONAL, storageSrv, router, cdRef, fb, store);

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe))
      .subscribe((payload: IOnboarding) => {
        if (payload?.personal?.id) {
          this._store.dispatch(updateOnboardingPersonalValuesAction({ payload }));
        }
      });
  }

  ngOnInit(): void {
    this.getPersonalForm.get('occupantType').patchValue({
      label: 'Home Owner',
      value: String(OccupantType.HomeOwner)
    });
    this._cdRef.detectChanges();
  }

  public onPersonalImageChange(event: any): void {
    let file: any
    if (_.isObject(event)) {
      file = event;
    } else {
      file = event.target.files[0];
    }
    this.getPersonalForm.get('uploadPersonalIdFile').patchValue(file);
  }

  public getFileName(formName: string): string {
    return this.getPersonalForm.get(formName)?.value?.name;
  }

  public onNext(): void {
    super.onNext(ONBOARDINGSPOUSEROUTE(this.id));

    //this._store.dispatch(addToPersonalAction({ payload: this.getPersonalForm.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGSPOUSE }));
  }

  public onPrev(): void {
    setTimeout(() => {
      super.onPrev(ONBOARDINGTYPEROUTE(this.id), STRPERSONAL, this.getPersonalForm.value);

      //this._store.dispatch(addToPersonalAction({ payload: this.getPersonalForm.value }));
      this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGTYPE }));
    }, 100);
  }
}
