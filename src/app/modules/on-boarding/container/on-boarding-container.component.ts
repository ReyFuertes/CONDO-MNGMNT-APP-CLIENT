import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy';
import { RooState } from 'src/app/store/root.reducer';
import { getOnboardingSubmittedSelector } from '../store/onboarding.selector';

@Component({
  selector: 'cma-on-boarding-container',
  templateUrl: './on-boarding-container.component.html',
  styleUrls: ['./on-boarding-container.component.scss']
})
export class OnboardingContainerComponent extends GenericDestroyPageComponent implements OnInit {
  public hideStepper: boolean = false;

  constructor(private store: Store<RooState>, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const forApproval = e.urlAfterRedirects.includes('for-approval');

        if (forApproval) {
          this.hideStepper = true;
        } else this.hideStepper = false;
      });

    this.store.pipe(select(getOnboardingSubmittedSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        
      })
  }
}
