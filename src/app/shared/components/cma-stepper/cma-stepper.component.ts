import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { getOnboardingStepperSelector } from 'src/app/modules/on-boarding/store/onboarding.selector';
import { StorageService } from 'src/app/services/storage.service';
import { AppState } from 'src/app/store/app.reducer';
import { ONBOARDINGDOCUMENTS, ONBOARDINGPARTNER, ONBOARDINGPERSONAL, ONBOARDINGTYPE, ONBOARDINGREVIEW, ONBOARDINGOCCUPANTS } from '../../constants/generic';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-stepper',
  templateUrl: './cma-stepper.component.html',
  styleUrls: ['./cma-stepper.component.scss']
})
export class CMStepperComponent extends GenericDestroyPageComponent implements OnInit {
  public stepper: ISimpleItem[];
  public currStep: string = ONBOARDINGTYPE;

  constructor(private router: Router, private store: Store<AppState>, private storageSrv: StorageService) {
    super();
    this.stepper = [{
      label: 'Type',
      value: ONBOARDINGTYPE,
      route: '/on-boarding/type',
    }, {
      label: 'Personal',
      value: ONBOARDINGPERSONAL,
      route: '/on-boarding/personal',
    }, {
      label: 'Partner',
      value: ONBOARDINGPARTNER,
      route: '/on-boarding/partner',
    }, {
      label: 'Occupants',
      value: ONBOARDINGOCCUPANTS,
      route: '/on-boarding/occupants',
    }, {
      label: 'Document',
      value: ONBOARDINGDOCUMENTS,
      route: '/on-boarding/documents',
    }, {
      label: 'Review',
      value: ONBOARDINGREVIEW,
      route: '/on-boarding/review',
    }];
  }

  ngOnInit(): void {
    this.store.pipe(select(getOnboardingStepperSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(step => {
        if (step) {
          this.currStep = step;
        } else {
          const s = this.storageSrv.get('step');
          
          this.currStep = s || ONBOARDINGTYPE;

          this.router.navigateByUrl(this.stepper?.find(s => s.value === this.currStep)?.route);
        }
      })
  }
}
