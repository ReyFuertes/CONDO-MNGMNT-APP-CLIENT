import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { getDashboardOnboardingSelector } from '../../store/selectors/dashboard-onboarding.selector';

@Component({
  selector: 'cma-dashboard-on-boarding-panel',
  templateUrl: './dashboard-on-boarding-panel.component.html',
  styleUrls: ['./dashboard-on-boarding-panel.component.scss']
})
export class DashboardOnboardingPanelComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public isExpanded: any = false;
  public onBoardingType = OnBoardingType;
  public onboardingStatus: any[];
  public $onboardings: Observable<IOnboarding[]>;

  constructor(private store: Store<RooState>) {
    super();
  }

  ngOnInit(): void {
    this.onboardingStatus = ['Approved', 'Orientation', 'Move-In'];
    this.$onboardings = this.store.pipe(select(getDashboardOnboardingSelector), delay(300));
  }

  public getFullName(item: IOnboarding): string {
    return `${item?.personal?.firstname} ${item?.personal?.middlename} ${item?.personal?.lastname}`
  }

  public onPanelClick(i: number): void {
    this.isExpanded = i;
  }
}
