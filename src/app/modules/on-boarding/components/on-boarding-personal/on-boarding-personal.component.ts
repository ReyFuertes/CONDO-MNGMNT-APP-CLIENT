import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { Router } from '@angular/router';
import { addToPersonalAction, setOnboardingStepperAction, updateOnboardingPersonalValuesAction } from '../../store/onboarding.action';
import { OCCUPANTOPTIONS, ONBOARDINGSPOUSE, ONBOARDINGPERSONAL, ONBOARDINGTYPE, STRPERSONAL, ROUTEACTIONSTYPE } from 'src/app/shared/constants/generic';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { ONBOARDINGSPOUSEROUTE, ONBOARDINGTYPEROUTE } from 'src/app/shared/constants/routes';
import { takeUntil } from 'rxjs/operators';
import { IOnboarding } from '../../on-boarding.model';
import { RouteActionsType } from 'src/app/models/onboarding.model';
@Component({
  selector: 'cma-on-boarding-personal',
  templateUrl: './on-boarding-personal.component.html',
  styleUrls: ['./on-boarding-personal.component.scss']
})
export class OnboardingPersonalComponent extends GenericOnBoardingComponent implements OnInit {
  public occupantOptions = OCCUPANTOPTIONS;
  public files: File[] = [];
  public uploadPersonalIdFileDisabled: boolean = true;

  constructor(storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>,
    public _storageSrv: StorageService, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>, private _cdRef: ChangeDetectorRef) {
    super(OnboardingEntityType.ONBOARDINGPERSONAL, storageSrv, router, cdRef, fb, store);
  }

  ngOnInit(): void {
    this.getSpouseForm.get('lastname').valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(res => {
        this.uploadPersonalIdFileDisabled = !res;
      });

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe))
      .subscribe((payload: IOnboarding) => {
        if (payload?.personal?.id) {
          this._store.dispatch(updateOnboardingPersonalValuesAction({ payload }));
        };
      });
  }

  public onPersonalImageChange(event: any): void {
    let fileObj = {
      lastModified: event?.lastModified,
      lastModifiedDate: event?.lastModifiedDate,
      name: `${this.getPersonalName}.${event?.name?.split('.')?.pop()}`,
      size: event?.size,
      type: event?.type,
      webkitRelativePath: event?.webkitRelativePath,
    }
    let file = event;

    this.getPersonalForm.get('uploadPersonalIdFile').patchValue({ fileObj, file });
  }

  public getFileName(formName: string): string {
    return this.getPersonalForm.get(formName)?.value?.fileObj?.name || this.getPersonalForm.get(formName)?.value;
  }

  public get getPersonalName(): string {
    return this.getName(this.getPersonalForm, STRPERSONAL);
  }

  public onNext(): void {
    super.onNext(ONBOARDINGSPOUSEROUTE(this.id, <RouteActionsType>this.getActionFromStorage(ROUTEACTIONSTYPE)), STRPERSONAL, this.getPersonalForm.value);

    this._store.dispatch(addToPersonalAction({ payload: this.getPersonalForm.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGSPOUSE }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGTYPEROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGTYPE }));
  }
}
