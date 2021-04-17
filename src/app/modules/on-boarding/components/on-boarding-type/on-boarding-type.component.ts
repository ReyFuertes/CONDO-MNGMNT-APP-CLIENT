import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGPERSONAL } from 'src/app/shared/constants/generic';
import { ONBOARDINGPERSONALROUTE } from 'src/app/shared/constants/routes';
import { OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { setOnboardingStepperAction } from '../../store/onboarding.action';

@Component({
  selector: 'cma-on-boarding-type',
  templateUrl: './on-boarding-type.component.html',
  styleUrls: ['./on-boarding-type.component.scss']
})
export class OnboardingTypeComponent extends GenericOnBoardingComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public selectedTypeIsIndividual: any;
  public selectedTypeICorporate: any;
  public selectedType: any;
  public onboardingType = OnBoardingType;

  constructor(storageSrv: StorageService, router: Router, private store: Store<RooState>,
    public _storageSrv: StorageService, cdRef: ChangeDetectorRef, fb: FormBuilder) {
    super(OnboardingEntityType.ONBOARDINGTYPE, storageSrv, router, cdRef, fb);
  }

  ngOnInit(): void {
    const type = this._storageSrv.get('type');
    if (type) {
      this.selectedType = JSON.parse(type);
      this.getSelection(this.selectedType);
    }
  }

  public onSelect(chk: any): void {
    chk.checked = !chk.checked;

    this.getSelection(chk.value);
    this.selectedType = chk.value;
  }

  private getSelection(value: string): void {
    if (value == OnBoardingType.Individual) {
      this.selectedTypeIsIndividual = !this.selectedTypeIsIndividual;
      this.selectedTypeICorporate = false;
    } else if (value == OnBoardingType.Corporate) {
      this.selectedTypeICorporate = !this.selectedTypeICorporate;
      this.selectedTypeIsIndividual = false;
    }
  }

  public onNext(): void {
    super.onNext(ONBOARDINGPERSONALROUTE, 'type', this.selectedType);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }

  public get isDisabled(): boolean {
    return !this.selectedTypeIsIndividual && !this.selectedTypeICorporate;
  }
}
