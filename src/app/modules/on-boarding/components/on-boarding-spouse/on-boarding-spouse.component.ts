import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { Router } from '@angular/router';
import { addToSpouseAction, setOnboardingStepperAction, updateOnboardingSpouseValuesAction } from '../../store/onboarding.action';
import { ONBOARDINGOCCUPANTS, ONBOARDINGPERSONAL, ROUTEACTIONSTYPE, STRSPOUSE } from 'src/app/shared/constants/generic';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { ONBOARDINGOCCUPANTSROUTE, ONBOARDINGPERSONALROUTE } from 'src/app/shared/constants/routes';
import { takeUntil } from 'rxjs/operators';
import { IOnboarding } from '../../on-boarding.model';
import { RouteActionsType } from 'src/app/models/onboarding.model';

@Component({
  selector: 'cma-on-boarding-spouse',
  templateUrl: './on-boarding-spouse.component.html',
  styleUrls: ['./on-boarding-spouse.component.scss']
})
export class OnboardingSpouseInfoComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];
  public uploadSpouseIdFileDisabled: boolean = true;

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
    this.getSpouseForm.get('lastname').valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(res => {
        this.uploadSpouseIdFileDisabled = !res;
      });
    this._cdRef.detectChanges();
  }

  public onSpouseImageChange(event: any): void {
    let fileObj = {
      lastModified: event?.lastModified,
      lastModifiedDate: event?.lastModifiedDate,
      name: `${this.getSpouseName}.${event?.name?.split('.')?.pop()}`,
      size: event?.size,
      type: event?.type,
      webkitRelativePath: event?.webkitRelativePath,
    }
    let file = event;

    this.getSpouseForm.get('uploadSpouseIdFile').patchValue({ fileObj, file });
  }

  public getFileName(formName: string): string {
    return this.getSpouseForm.get(formName)?.value?.fileObj?.name || this.getSpouseForm.get(formName)?.value;
  }

  public get getSpouseName(): string {
    return this.getName(this.getSpouseForm, STRSPOUSE);
  }

  public onNext(): void {
    super.onNext(ONBOARDINGOCCUPANTSROUTE(this.id, <RouteActionsType>this.getActionFromStorage(ROUTEACTIONSTYPE)), STRSPOUSE, this.getSpouseForm.value);

    this._store.dispatch(addToSpouseAction({ payload: this.getSpouseForm.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGPERSONALROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }
}