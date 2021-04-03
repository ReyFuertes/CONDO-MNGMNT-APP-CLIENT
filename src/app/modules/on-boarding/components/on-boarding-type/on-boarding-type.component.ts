import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGPERSONAL, ONBOARDINGTYPE } from 'src/app/shared/constants/generic';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { AppState } from 'src/app/store/app.reducer';
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

  constructor(storageSrv: StorageService, router: Router, private store: Store<AppState>) {
    super(ONBOARDINGTYPE, storageSrv, router);
  }

  ngOnInit(): void { }

  public onSelect(chk: any): void {
    chk.checked = !chk.checked;

    if (chk.value == OnBoardingType.individual) {
      this.selectedTypeIsIndividual = !this.selectedTypeIsIndividual;
      this.selectedTypeICorporate = false;
    } else if (chk.value == OnBoardingType.corporate) {
      this.selectedTypeICorporate = !this.selectedTypeICorporate;
      this.selectedTypeIsIndividual = false;
    }
  }

  public onNext(): void {
    super.onNext('/on-boarding/personal');

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPERSONAL }));
  }

  public get isDisabled(): boolean {
    return !this.selectedTypeIsIndividual && !this.selectedTypeICorporate;
  }
}
