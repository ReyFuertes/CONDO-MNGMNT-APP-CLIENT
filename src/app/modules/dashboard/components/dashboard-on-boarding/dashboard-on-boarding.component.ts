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
    { label: 'Contact No.', value: 'contact_no' },
    { label: 'ID No.', value: 'id_no' },
    { label: 'ID Type', value: 'id_type' },
    { label: 'Occupation', value: 'occupation' },
    { label: 'Gender', value: 'gender' }
  ];
  public form: FormGroup;
  public params: string;

  constructor(private fb: FormBuilder, private store: Store<RooState>) {
    super();
    localStorage.setItem('nav', JSON.stringify(MenuType.Onboarding));

    this.form = this.fb.group({
      fieldFilter: [null]
    });

    this.store.dispatch(loadDashboardOnboardingAction({}));

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe))
      .subscribe(({ fieldFilter }) => {
        if (fieldFilter) {
          const params = fieldFilter?.map(ff => {
            return `${ff?.value}=@searchValue`;
          });
          this.params = `&${params.join("&")}`;
        }
      })
  }

  public handleValueEmitter(event: any): void {
    console.log(event)
  }

  public onSearch(keyword: any): void {
    if (keyword?.length > 3) {
      const params = this.params.replace(/@searchValue/g, keyword);

      this.store.dispatch(loadDashboardOnboardingAction({ keyword: `${keyword}${params}` }));
    } else if (keyword?.length === 0) {
      this.store.dispatch(loadDashboardOnboardingAction({}));
    }
  }
}
