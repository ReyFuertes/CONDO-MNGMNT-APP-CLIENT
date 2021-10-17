import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy';
import { RooState } from 'src/app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { loadDashboardOnboardingAction } from '../../store/actions/dashboard-onboarding.action';
import { getDashboardOnboardingSelector } from '../../store/selectors/dashboard-onboarding.selector';

@Component({
  selector: 'cma-dashboard-on-boarding-panel',
  templateUrl: './dashboard-on-boarding-panel.component.html',
  styleUrls: ['./dashboard-on-boarding-panel.component.scss']
})
export class DashboardOnboardingPanelComponent extends GenericContainer implements AfterViewInit {
  @Input() public paginationParams: any;
  @Output() public reloadEmitter = new EventEmitter<boolean>();

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public isExpanded: any = false;
  public onBoardingType = OnBoardingType;
  public onboardingStatus: any[];
  public $onboardings: Observable<IOnboarding[]>;

  constructor(storageSrv: StorageService, private store: Store<RooState>) {
    super(storageSrv);
  }

  ngAfterViewInit(): void {
    this.onboardingStatus = ['Approved', 'Orientation', 'Move-In'];
    this.$onboardings = this.store.pipe(select(getDashboardOnboardingSelector), delay(300));
  }

  public onReload(): void {
    this.reloadEmitter.emit(true);
    this.store.dispatch(loadDashboardOnboardingAction({ keyword: `${this.paginationParams}` }));
  }

  public getFullName(item: IOnboarding): string {
    return `${item?.personal?.firstname} ${item?.personal?.middlename} ${item?.personal?.lastname}`
  }

  public onPanelClick(i: number): void {
    this.isExpanded = i;
  }
}
