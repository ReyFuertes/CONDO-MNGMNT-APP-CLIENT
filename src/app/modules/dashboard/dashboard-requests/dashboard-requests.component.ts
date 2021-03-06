import { Component, OnInit } from '@angular/core';
import { MENUS } from 'src/app/shared/constants/menu';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-requests',
  templateUrl: './dashboard-requests.component.html',
  styleUrls: ['./dashboard-requests.component.scss']
})
export class DashboardRequestsComponent implements OnInit {
  public breadCrumbItems: ISimpleItem[] = MENUS;
  constructor() { }

  ngOnInit(): void { }
}
