import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MenuType, RouteActionsType } from 'src/app/models/onboarding.model';
import { ONBOARDINGBREADCRUMBS } from 'src/app/shared/constants/breadcrumbs';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { RooState } from 'src/app/store/root.reducer';
import { loadDashboardOnboardingAction } from '../../store/actions/dashboard-onboarding.action';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { getDashboardOnboardingCountSelector } from '../../store/selectors/dashboard-onboarding.selector';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ONBOARDINGTYPEROUTE } from 'src/app/shared/constants/routes';
import { ONBOARDINGACTIONID, ROUTEACTIONSTYPE } from 'src/app/shared/constants/generic';
import { clearStepperAction } from 'src/app/modules/on-boarding/store/onboarding.action';
import { CMAInputSearchComponent } from 'src/app/shared/components/input-search/input-search.component';

@Component({
  selector: 'cma-dashboard-on-boarding',
  templateUrl: './dashboard-on-boarding.component.html',
  styleUrls: ['./dashboard-on-boarding.component.scss']
})
export class DashboardOnboardingComponent extends GenericContainer implements AfterViewInit {
  @ViewChild('searchInput', { static: false }) searchInput: CMAInputSearchComponent;

  public breadCrumbItems: ISimpleItem[] = ONBOARDINGBREADCRUMBS;
  public settingItems: MenuItem[] = [{
    label: 'Invite',
    items: [
      { label: 'Email Invite', icon: 'pi pi-fw pi-send' }
    ]
  }, {
    label: 'Move To',
    items: [
      { label: 'Orientation', icon: 'pi pi-fw pi-info-circle' },
      { label: 'Move-In', icon: 'pi pi-fw pi-info-circle' }
    ]
  }, {
    label: 'Data',
    items: [
      { label: 'Import', icon: 'pi pi-fw pi-cloud-download' },
      { label: 'Export', icon: 'pi pi-fw pi-cloud-upload' }
    ]
  }, {
    label: 'Calendar',
    items: [
      { label: 'Orientation', icon: 'pi pi-fw pi-calendar' },
      { label: 'Move-in', icon: 'pi pi-fw pi-calendar-plus' }
    ]
  }];
  public actionItems: MenuItem[];
  public filterOptions: ISimpleItem[] = [
    { label: 'Citizenship', value: 'citizenship' },
    { label: 'Contact No.', value: 'contactNo' },
    { label: 'ID No.', value: 'idNo' },
    { label: 'ID Type', value: 'idType' },
    { label: 'Occupation', value: 'occupation' },
    { label: 'Gender', value: 'gender' }
  ];
  public form: FormGroup;
  public filterParams: string;
  public filterChanged: boolean = false;
  public pGRowCount: number = 10;
  public pGSkipCount: number = 0;
  public paginationParams: string;
  public $onboardingCount: Observable<number>;
  public defaultSearchFields: string = '';
  public rowsPerPageOptions: number[] = [3, 10, 20, 30];
  public fmtFilterParams: string = '';

  constructor(private _storageSrv: StorageService, storageSrv: StorageService, private router: Router, private fb: FormBuilder, private store: Store<RooState>) {
    super(storageSrv);

    localStorage.setItem('nav', JSON.stringify(MenuType.Onboarding));
    this.paginationParams = `take=${this.pGRowCount}&skip=${this.pGSkipCount}`;

    this.form = this.fb.group({
      filterKeyword: [null],
      fieldFilter: [null],
      strFieldFilter: [null]
    });

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe), debounceTime(600))
      .subscribe(({ fieldFilter }) => {
        if (fieldFilter) {
          const keyword = this.form.get('filterKeyword').value;
          const filterParams = fieldFilter?.map((ff) => {
            return `personal.${ff?.value}=@searchValue&spouse.${ff?.value}=@searchValue`;
          });

          this.filterChanged = filterParams !== _.clone(filterParams, true);
          const fmtFilterParams = `${filterParams.join("&")}&`;

          this.form.get('strFieldFilter').patchValue(fmtFilterParams, { emitEvent: false });
          if (keyword) {
            this.onSearch(keyword, fmtFilterParams);
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.$onboardingCount = this.store.pipe(select(getDashboardOnboardingCountSelector));
  }

  public createNew(): void {
    const newId = uuid();
    super.routeTo(ONBOARDINGACTIONID, newId);
    super.routeTo(ROUTEACTIONSTYPE, RouteActionsType.Add);
    this.router.navigateByUrl(ONBOARDINGTYPEROUTE(newId, RouteActionsType.Add));
  }

  public onPaginate(event: any): void {
    this.paginationParams = `take=${event?.rows}&skip=${event?.first}`;

    const searchKeyword = this.form.get('filterKeyword')?.value;
    this.onSearch(searchKeyword);
  }

  public reloadEmitter(): void {
    this.form.reset();
    this.searchInput.input.nativeElement.value = '';
  }

  public onRefresh(): void {
    this.load();
  }

  private load(): void {
    this.store.dispatch(loadDashboardOnboardingAction({ keyword: `${this.paginationParams}` }));
  }

  public onSearch(keyword: any, filter?: any): void {
    if (keyword === null || keyword?.length === 0) {
      this.load();
      this.form.get('filterKeyword').patchValue(null);
    } else {
      this.form.get('filterKeyword').patchValue(keyword, { emitEvent: false });

      const defaultSearchFieldsArr = ['personal', 'spouse'] || '';
      this.defaultSearchFields = '';

      for (let i = 0; i < defaultSearchFieldsArr?.length; i++) {
        this.defaultSearchFields += `${defaultSearchFieldsArr[i]}.firstname=${keyword}&${defaultSearchFieldsArr[i]}.lastname=${keyword}&${defaultSearchFieldsArr[i]}.middlename=${keyword}&`;
      };

      this.fmtFilterParams = filter || this.form.get('strFieldFilter').value;
      this.fmtFilterParams = this.fmtFilterParams?.replace(/@searchValue/g, keyword) || '';

      this.store.dispatch(loadDashboardOnboardingAction({ keyword: `${this.defaultSearchFields}${this.fmtFilterParams}${this.paginationParams}` }));
    }
  }
}
