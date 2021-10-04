import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { MenuType } from 'src/app/models/onboarding.model';
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

@Component({
  selector: 'cma-dashboard-on-boarding',
  templateUrl: './dashboard-on-boarding.component.html',
  styleUrls: ['./dashboard-on-boarding.component.scss']
})
export class DashboardOnboardingComponent extends GenericContainer implements OnInit {
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
  public paginationParams: any;
  public $onboardingCount: Observable<number>;

  constructor(private storageSrv: StorageService, private router: Router, private fb: FormBuilder, private store: Store<RooState>) {
    super();
    localStorage.setItem('nav', JSON.stringify(MenuType.Onboarding));

    this.form = this.fb.group({
      filterKeyword: [null],
      fieldFilter: [null]
    });

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe))
      .subscribe(({ fieldFilter }) => {
        if (fieldFilter) {

          const filterParams = fieldFilter?.map((ff) => {
            return `personal.${ff?.value}=@searchValue&spouse.${ff?.value}=@searchValue`;
          });
          this.filterChanged = filterParams !== _.clone(filterParams, true);

          this.filterParams = `&${filterParams.join("&")}`;

          const searchKeyword = this.form.get('filterKeyword')?.value;
          if (searchKeyword) {
            this.onSearch(searchKeyword);
          }
        }
      });

    this.paginationParams = `take=${this.pGRowCount}&skip=${this.pGSkipCount}`;

    this.$onboardingCount = this.store.pipe(select(getDashboardOnboardingCountSelector));
  }

  public createNew(): void {
    const newId = uuid();
    this.storageSrv.set('obId', JSON.stringify(newId));
    this.router.navigateByUrl(ONBOARDINGTYPEROUTE(newId));
  }

  public onPaginate(event: any): void {
    this.paginationParams = `take=${event?.rows}&skip=${event?.first}`;

    const searchKeyword = this.form.get('filterKeyword')?.value || '';
    this.onSearch(searchKeyword);
  }

  public onSearch(keyword: any): void {
    if (keyword?.length > 3) {
      if (this.form.get('filterKeyword')?.value === keyword && !this.filterParams) return;

      this.form.get('filterKeyword').patchValue(keyword, { emitEvent: false });

      const ambigousFields = ['personal', 'spouse'];
      let searchParams: string = '';

      for (let i = 0; i < ambigousFields?.length; i++) {
        searchParams += `${ambigousFields[i]}.firstname=${keyword}&${ambigousFields[i]}.lastname=${keyword}&${ambigousFields[i]}.middlename=${keyword}&`;
      };

      let params = this.filterParams?.replace(/@searchValue/g, keyword) || '';

      this.store.dispatch(loadDashboardOnboardingAction({ keyword: `${searchParams}${params}${this.paginationParams}` }));
    } else {
      this.store.dispatch(loadDashboardOnboardingAction({ keyword: `${this.paginationParams}` }));
    }
  }
}
