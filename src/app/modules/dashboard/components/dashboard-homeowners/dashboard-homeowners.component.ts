import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IHomeowner } from 'src/app/models/homeowners.model';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { IPersonal } from 'src/app/modules/on-boarding/on-boarding.model';
import { StorageService } from 'src/app/services/storage.service';
import { DASHBOARDONBOARDINGROUTE } from 'src/app/shared/constants/routes';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { environment } from 'src/environments/environment';
import { loadDashboardHomeownersAction } from '../../store/actions/dashboard-homeowners.action';
import { getDashboardHomeownersSelector } from '../../store/selectors/dashboard-homeowner.selector';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { shareReplay, take } from 'rxjs/operators';
const DEFAULT_DURATION = 200;
@Component({
  selector: 'cma-dashboard-homeowners',
  templateUrl: './dashboard-homeowners.component.html',
  styleUrls: ['./dashboard-homeowners.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class DashboardHomeownersComponent extends GenericContainer implements AfterViewInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public onBoardingType = OnBoardingType;
  public onboardingStatus: any[];
  public $homeowners: Observable<IHomeowner[]>;
  public openedIndexPanel: number = 0;
  public selectedTabIndex: number = 0;
  public dataSource: any;
  public columnsToDisplay = ['name'];
  public collapsed: boolean = false;
  public collapsedIndex: number;

  public toggle(index: number) {
    this.collapsed = !this.collapsed;
    if(this.collapsedIndex === index) {
      this.collapsedIndex = null
    } else {
      this.collapsedIndex = index;
    }
  }

  constructor(private store: Store<Store>, storageSrv: StorageService, private router: Router) {
    super(storageSrv);
    this.onboardingStatus = ['Approved', 'Orientation', 'Move-In'];

    this.$homeowners = this.store.pipe(select(getDashboardHomeownersSelector));
    this.store.pipe(select(getDashboardHomeownersSelector), take(1)).subscribe(res => {
      debugger
      this.dataSource = res?.map(values => {
        return {
          name: `${values?.personal?.firstname} ${values?.personal?.lastname}`,
          ...values
        }
      });
    })
  }

  ngAfterViewInit(): void {
    this.store.dispatch(loadDashboardHomeownersAction({}));
  }

  public getFullName(personal: IPersonal): string {
    return `${personal?.firstname} ${personal?.middlename} ${personal?.lastname}`;
  }

  public onEdit(id: string): void {
    this.router.navigateByUrl(`${DASHBOARDONBOARDINGROUTE}/${id}/detail`);
  }

  public getStatusIndex(value: any): any {
    return this.onboardingStatus.findIndex(i => i === value)
  }

  public onPanelClick(i: number): void {
    this.openedIndexPanel = i;
  }
}