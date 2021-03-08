import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { REQUESTSBREADCRUMBS } from 'src/app/shared/constants/breadcrumbs';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-requests',
  templateUrl: './dashboard-requests.component.html',
  styleUrls: ['./dashboard-requests.component.scss']
})
export class DashboardRequestsComponent implements OnInit {
  public breadCrumbItems: ISimpleItem[] = REQUESTSBREADCRUMBS;
  public settingItems: MenuItem[];
  public actionItems: MenuItem[];

  constructor() { }

  ngOnInit(): void {
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