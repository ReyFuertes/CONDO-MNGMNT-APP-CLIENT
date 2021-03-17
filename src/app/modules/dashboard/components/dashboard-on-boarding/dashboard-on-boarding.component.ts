import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuType } from 'src/app/models/onboarding.model';
import { ONBOARDINGBREADCRUMBS } from 'src/app/shared/constants/breadcrumbs';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-on-boarding',
  templateUrl: './dashboard-on-boarding.component.html',
  styleUrls: ['./dashboard-on-boarding.component.scss']
})
export class DashboardOnboardingComponent extends GenericContainer implements OnInit {
  public breadCrumbItems: ISimpleItem[] = ONBOARDINGBREADCRUMBS;
  public settingItems: MenuItem[];
  public actionItems: MenuItem[];

  constructor() { 
    super();
    localStorage.setItem('nav', JSON.stringify(MenuType.Onboarding));

    this.settingItems = [
      {
        label: 'Move To',
        items: [
          { label: 'Orientation', icon: 'pi pi-fw pi-info-circle' },
          { label: 'Move-In', icon: 'pi pi-fw pi-info-circle' }
        ]
      },
      {
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
      }
    ];
  }
}
