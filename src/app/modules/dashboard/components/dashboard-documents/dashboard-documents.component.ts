import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { StorageService } from 'src/app/services/storage.service';
import { HOMEOWNERSBREADCRUMBS } from 'src/app/shared/constants/breadcrumbs';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-documents',
  templateUrl: './dashboard-documents.component.html',
  styleUrls: ['./dashboard-documents.component.scss']
})
export class DashboardDocumentsComponent  extends GenericContainer implements OnInit {
  public breadCrumbItems: ISimpleItem[] = HOMEOWNERSBREADCRUMBS;
  public settingItems: MenuItem[];
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

  constructor(storageSrv: StorageService, private fb: FormBuilder) {
    super(storageSrv);

    this.form = this.fb.group({
      filterKeyword: [null],
      fieldFilter: [null]
    });
  }

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