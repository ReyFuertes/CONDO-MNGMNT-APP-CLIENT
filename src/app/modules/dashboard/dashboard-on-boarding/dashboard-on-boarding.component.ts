import { Component, OnInit } from '@angular/core';
import { ONBOARDINGMENUS } from 'src/app/shared/constants/menu';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-on-boarding',
  templateUrl: './dashboard-on-boarding.component.html',
  styleUrls: ['./dashboard-on-boarding.component.scss']
})
export class DashboardOnboardingComponent implements OnInit {
  public breadCrumbItems: ISimpleItem[] = ONBOARDINGMENUS;

  constructor() { }

  ngOnInit(): void { }
}
