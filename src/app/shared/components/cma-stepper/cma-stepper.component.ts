import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { getOnboardingStepperSelector } from 'src/app/modules/on-boarding/store/onboarding.selector';
import { StorageService } from 'src/app/services/storage.service';
import { AppState } from 'src/app/store/app.reducer';
import { ONBOARDINGDOCUMENTS, ONBOARDINGPARTNER, ONBOARDINGPERSONAL, ONBOARDINGTYPE } from '../../constants/generic';
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

  constructor(private store: Store<AppState>, private storageSrv: StorageService) {
    super();

    this.stepper = [{
      label: 'Type',
      value: ONBOARDINGTYPE
    }, {
      label: 'Personal',
      value: ONBOARDINGPERSONAL
    }, {
      label: 'Partner',
      value: ONBOARDINGPARTNER
    }, {
      label: 'Document',
      value: ONBOARDINGDOCUMENTS
    }];
  }

  ngOnInit(): void {
    this.store.pipe(select(getOnboardingStepperSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(step => {
        if(step) {
          this.currStep = step;
        } else {
          this.currStep = ONBOARDINGTYPE;
        }
      })
  }
}
