import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HOMEOWNERSBREADCRUMBS } from 'src/app/shared/constants/breadcrumbs';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-documents',
  templateUrl: './dashboard-documents.component.html',
  styleUrls: ['./dashboard-documents.component.scss']
})
export class DashboardDocumentsComponent implements OnInit {
  public breadCrumbItems: ISimpleItem[] = HOMEOWNERSBREADCRUMBS;
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