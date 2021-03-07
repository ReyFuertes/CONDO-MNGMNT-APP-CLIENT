import { Component, OnInit } from '@angular/core';
import { REQUESTMENUS } from 'src/app/shared/constants/menu';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-requests',
  templateUrl: './dashboard-requests.component.html',
  styleUrls: ['./dashboard-requests.component.scss']
})
export class DashboardRequestsComponent implements OnInit {
  public breadCrumbItems: ISimpleItem[] = REQUESTMENUS;
  constructor() { }

  ngOnInit(): void { }
}
