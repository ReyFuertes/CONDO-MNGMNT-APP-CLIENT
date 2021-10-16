import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounce, debounceTime, takeUntil } from 'rxjs/operators';
import { getOnboardingStepperSelector } from 'src/app/modules/on-boarding/store/onboarding.selector';
import { StorageService } from 'src/app/services/storage.service';
import { RooState } from 'src/app/store/root.reducer';
import { ONBOARDINGDOCUMENTS, ONBOARDINGSPOUSE, ONBOARDINGPERSONAL, ONBOARDINGTYPE, ONBOARDINGREVIEW, ONBOARDINGOCCUPANTS, ONBOARDINGACTIONID, ROUTEACTIONSTYPE } from '../../constants/generic';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy';
import { ISimpleItem, OnboardingEntityType } from '../../generics/generic-model';

@Component({
  selector: 'cma-stepper',
  templateUrl: './cma-stepper.component.html',
  styleUrls: ['./cma-stepper.component.scss']
})
export class CMStepperComponent extends GenericDestroyPageComponent implements OnInit {
  public stepper: ISimpleItem[];
  public currStep: string = ONBOARDINGTYPE;

  constructor(private router: Router, private store: Store<RooState>, private storageSrv: StorageService) {
    super();
  }

  private getValueFromStorage(name: string): string {
    let _name = this.storageSrv.get(name);
    if (_name) {
      _name = JSON.parse(_name);
      return _name;
    }
    return '';
  }

  ngOnInit(): void {
    this.stepper = [{
      label: 'Type',
      value: OnboardingEntityType.ONBOARDINGTYPE,
      route: `/on-boarding/type/${this.getValueFromStorage(ONBOARDINGACTIONID)}/${this.getValueFromStorage(ROUTEACTIONSTYPE)}`,
    }, {
      label: 'Personal',
      value: OnboardingEntityType.ONBOARDINGPERSONAL,
      route: `/on-boarding/personal/${this.getValueFromStorage(ONBOARDINGACTIONID)}/${this.getValueFromStorage(ROUTEACTIONSTYPE)}`,
    }, {
      label: 'Spouse',
      value: OnboardingEntityType.ONBOARDINGSPOUSE,
      route: `/on-boarding/spouse/${this.getValueFromStorage(ONBOARDINGACTIONID)}/${this.getValueFromStorage(ROUTEACTIONSTYPE)}`,
    }, {
      label: 'Occupants',
      value: OnboardingEntityType.ONBOARDINGOCCUPANTS,
      route: `/on-boarding/occupants/${this.getValueFromStorage(ONBOARDINGACTIONID)}/${this.getValueFromStorage(ROUTEACTIONSTYPE)}`,
    }, {
      label: 'Vehicles',
      value: OnboardingEntityType.ONBOARDINGVEHICLES,
      route: `/on-boarding/vehicles/${this.getValueFromStorage(ONBOARDINGACTIONID)}/${this.getValueFromStorage(ROUTEACTIONSTYPE)}`,
    }, {
      label: 'Documents',
      value: OnboardingEntityType.ONBOARDINGDOCUMENTS,
      route: `/on-boarding/documents/${this.getValueFromStorage(ONBOARDINGACTIONID)}/${this.getValueFromStorage(ROUTEACTIONSTYPE)}`,
    }, {
      label: 'Review',
      value: OnboardingEntityType.ONBOARDINGREVIEW,
      route: `/on-boarding/review/${this.getValueFromStorage(ONBOARDINGACTIONID)}/${this.getValueFromStorage(ROUTEACTIONSTYPE)}`,
    }];

    this.store.pipe(select(getOnboardingStepperSelector),
      takeUntil(this.$unsubscribe),
      debounceTime(100))
      .subscribe(step => {
        if (step) {
          this.currStep = step;
        } else {
          const s = this.storageSrv.get('step');

          this.currStep = s || ONBOARDINGTYPE;

          const route = this.stepper?.find(s => s.value === this.currStep)?.route;
          this.router.navigateByUrl(route);
        }
      });


  }
}
